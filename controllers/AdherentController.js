const { Adherent, Personne } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getAdherents = async (req, res, next) => { 
  try {       
    let { page, limit, recherche, tous } = req.query;
    const likeObj = { [Op.like]: `%${recherche}%` };
    const rechercheAsNumber = parseInt(recherche) || NaN;

    limit = parseInt(limit) || 10;
    page = parseInt(page) || 1;
    const offset = limit * (page - 1);
    const search = recherche
      ? {
        where: {
          [Op.or]: [
            { nom: likeObj },
            rechercheAsNumber ? { id: rechercheAsNumber } : {},
          ],
        },
      }
      : {};
    const totalCount = await Adherent.count();
    const Adherents = await Adherent.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Adherents });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdherentById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Adherent = await Adherent.findByPk(id);
    if (!Adherent)
      return next(new HttpError(404, "il n'ya pas de Adherent avec ce id"));
    res.status(200).json(Adherent);
  } catch (error) { 
    console.log(error);
  }
};   

exports.createAdherent = async (req, res, next) => {
  try {
    console.log(req.body);
    let createdAdherent = await Adherent.create({ ...req.body });
    let createdPersonne = await Personne.create({ ...req.body, AdherentId: createdAdherent.id });

    await createdAdherent.setPersonne(createdPersonne);

    res.status(201).json({ Adherent: createdAdherent });
  } catch (error) {
    console.log(error);
  }
}; 

exports.updateAdherent = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Adherent" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAdherent = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Adherent.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Adherent" });
  } catch (error) {
    console.log(error);
  }
};
