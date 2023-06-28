const { Livre, Ouvrage } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getLivres = async (req, res, next) => {
  try {
    let { page, limit, recherche, tous, target } = req.query;
    const likeObj = recherche ? { [Op.like]: `%${recherche}%` } : null;

    limit = parseInt(limit) || 15;
    page = parseInt(page) || 1;
    target = target ?? "";
console.log(target)
    const offset = limit * (page - 1);
    const totalCount = await Livre.count();
    const livres = await Livre.findAll({
      include: [
        {
          model: Ouvrage,
          options: { eager: true },
          as: "ouvrage",
          where: target && likeObj ? { 
            [Op.or]: [
              target == 1
                ? { titre: likeObj }
                : target == 2
                  ? { auteur1: likeObj }
                  : target == 3
                    ? { annee: likeObj }
                    : {}
            ],
          } : {}, 
        },
      ],
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),

    });
    res.status(200).json({ totalCount, livres });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLivreById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const livre = await Livre.findByPk(id); 
    if (!livre)
      return next(new HttpError(404, "il n'ya pas de livre avec ce id"));
    res.status(200).json(livre);
  } catch (error) {
    console.log(error);
  }
};

exports.createLivre = async (req, res, next) => {
  try {
    console.log(req.body);
    let createdLivre = await Livre.create({ ...req.body });
    let createdOuvrage = await Ouvrage.create({ ...req.body, livreId: createdLivre.id });

    await createdLivre.setOuvrage(createdOuvrage);

    res.status(201).json({ livre: createdLivre });
  } catch (error) {
    console.log(error);
  }
};

exports.updateLivre = async (req, res, next) => {
  try {
    let { id } = req.params;
    let body = req.body;
    id = Number.parseInt(id);
    const livre = await Livre.findOne({ where: { id }, include: { model: Ouvrage, eager: true, as: "ouvrage" } });

    await Livre.update(body, { where: { id } });
    await Ouvrage.update(body, { where: { id: livre.ouvrage.id } })
    res.status(200).json({ message: "updated livre" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLivre = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Livre.destroy({ where: { id } })
    res.status(200).json({ message: "supprimé  livre" });
  } catch (error) {
    console.log(error);
  }
};
