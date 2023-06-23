const { Personne } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getPersonnes = async (req, res, next) => {
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
    const totalCount = await Personne.count();
    const Personnes = await Personne.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Personnes });
  } catch (error) {
    console.log(error);
  }
};

exports.getPersonneById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Personne = await Personne.findByPk(id);
    if (!Personne)
      return next(new HttpError(404, "il n'ya pas de Personne avec ce id"));
    res.status(200).json(Personne);
  } catch (error) {
    console.log(error);
  }
};

exports.createPersonne = async (req, res, next) => {
  try {
    const { nom } = req.body;
    let createdPersonne = new Personne({
     cin,
     nom,
     prenom,
     telephone,
     email,
     motDePasse,
    });
    await createdPersonne.save();
    res.status(201).json({ message: "Personne créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePersonne = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Personne" });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePersonne = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Personne.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Personne" });
  } catch (error) {
    console.log(error);
  }
};
