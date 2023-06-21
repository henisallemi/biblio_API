const Livre = require("../models").Livre;
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getLivres = async (req, res, next) => {
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
    const totalCount = await Livre.count();
    const livres = await Livre.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, livres });
  } catch (error) {
    console.log(error);
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
    const { nom } = req.body;
    let createdLivre = new Livre({
      mot_cles,
    });
    await createdLivre.save();
    res.status(201).json({ message: "livre créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateLivre = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated livre" });
  } catch (error) { 
    console.log(error);
  }
}; 

exports.deleteLivre = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Livre.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  livre" }); 
  } catch (error) {
    console.log(error);
  }
};
