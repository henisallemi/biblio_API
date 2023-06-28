const { User } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getUsers = async (req, res, next) => {
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
    const totalCount = await User.count();
    const Users = await User.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Users });
  } catch (error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const User = await User.findByPk(id);
    if (!User)
      return next(new HttpError(404, "il n'ya pas de User avec ce id"));
    res.status(200).json(User);
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { nom } = req.body;
    let createdUser = new User({
     cin, 
     nom,
     prenom,
     telephone,
     email,
     motDePasse,
    });
    await createdUser.save();
    res.status(201).json({ message: "User créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated User" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await User.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  User" });
  } catch (error) {
    console.log(error);
  }
};
