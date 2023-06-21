const Ouvrage = require("../models").Ouvrage;
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getOuvrages = async (req, res, next) => {
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
    const totalCount = await Ouvrage.count();
    const Ouvrages = await Ouvrage.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Ouvrages });
  } catch (error) {
    console.log(error);
  }
};

exports.getOuvrageById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Ouvrage = await Ouvrage.findByPk(id);
    if (!Ouvrage)
      return next(new HttpError(404, "il n'ya pas de Ouvrage avec ce id"));
    res.status(200).json(Ouvrage);
  } catch (error) {
    console.log(error); 
  }
};

exports.createOuvrage = async (req, res, next) => {
  try { 
    const { nom } = req.body;
    let createdOuvrage = new Ouvrage({
      titre,
      auteurs,
      nb_exemplaire,  
      annéeEdition,
    });
    await createdOuvrage.save();
    res.status(201).json({ message: "Ouvrage créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateOuvrage = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Ouvrage" });
  } catch (error) { 
    console.log(error);
  }
}; 

exports.deleteOuvrage = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Ouvrage.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Ouvrage" }); 
  } catch (error) {
    console.log(error);
  }
};
