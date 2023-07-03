const { User } = require("../model");
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");
const { ADHERANT } = require("../config/config");
const bcrypt = require('bcrypt');

exports.getUsers = async (req, res, next) => {
  try {
    let { page, limit, recherche, target, role } = req.query;
    const likeObj = recherche ? { [Op.like]: `%${recherche}%` } : null;

    limit = parseInt(limit) || 15;
    page = parseInt(page) || 1;
    target = target ?? "";
    role = parseInt(role) ?? ADHERANT;
    const offset = limit * (page - 1);
    const totalCount = await User.count();
    const users = await User.findAll({
      where: {
        [Op.and]: [{ role }],
        ...(target && likeObj ? {
          [Op.or]: [
            target == 1
              ? { cin: likeObj }
              : target == 2
                ? { nom: likeObj }
                : target == 3
                  ? { prenom: likeObj }
                  : {}
          ],
        } : {}),
      },
      subQuery: false,
      offset: offset,
      limit: limit,

    });
    res.status(200).json({ totalCount, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUersByRole = async (req, res, next) => {
  try {
    let { role } = req.params;
    role = !isNaN(parseInt(role)) ? parseInt(role) : ADHERANT;
    const users = await User.findAll({
      where: {
        [Op.and]: [{ role }],
      }
    });

    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  };
}

exports.getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const user = await User.findByPk(id);
    if (!user)
      return next(new HttpError(404, "il n'ya pas de user avec ce id"));
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.motDePasse, salt);

    let createdUser = await User.create({
      ...req.body,
      motDePasse: hashedPassword,
      imagePath: req.file?.path ?? null
    });

    res.status(201).json({ user: createdUser });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let body = req.body;
    id = Number.parseInt(id);
    const user = await User.findOne({ where: { id } });

    await User.update({ ...body, imagePath: req.file?.path ?? user.imagePath }, { where: { id } });

    res.status(200).json({ message: "updated user" });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await User.destroy({ where: { id } })
    res.status(200).json({ message: "supprimé  user" });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email, motDePasse } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(motDePasse, user.motDePasse);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
  }
};

