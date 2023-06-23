const { Revue } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getRevues = async (req, res, next) => {
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
    const totalCount = await Revue.count();
    const Revues = await Revue.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Revues });
  } catch (error) {
    console.log(error);
  }
};

exports.getRevueById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Revue = await Revue.findByPk(id);
    if (!Revue)
      return next(new HttpError(404, "il n'ya pas de Revue avec ce id"));
    res.status(200).json(Revue);
  } catch (error) {
    console.log(error);
  }
};

exports.createRevue = async (req, res, next) => {
  try {
    const { nom } = req.body;
    let createdRevue = new Revue({
      journal,
    });
    await createdRevue.save();
    res.status(201).json({ message: "Revue créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateRevue = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Revue" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteRevue = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Revue.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Revue" });
  } catch (error) {
    console.log(error);
  }
};
