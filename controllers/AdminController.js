const { Admin, Personne } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getAdmins = async (req, res, next) => {
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
    const totalCount = await Admin.count();
    const Admins = await Admin.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Admins });
  } catch (error) {
    console.log(error);
  }
};

exports.getAdminById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Admin = await Admin.findByPk(id);
    if (!Admin)
      return next(new HttpError(404, "il n'ya pas de Admin avec ce id"));
    res.status(200).json(Admin);
  } catch (error) { 
    console.log(error); 
  } 
};

exports.createAdmin = async (req, res, next) => {
  try {
    console.log(req.body);
    let createdAdmin = await Admin.create({ ...req.body });
    let createdPersonne = await Personne.create({ ...req.body, AdminId: createdAdmin.id });

    await createdAdmin.setPersonne(createdPersonne);

    res.status(201).json({ Admin: createdAdmin });
  } catch (error) {
    console.log(error);
  }
}; 

exports.updateAdmin = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Admin" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAdmin = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Admin.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Admin" });
  } catch (error) {
    console.log(error);
  }
};
