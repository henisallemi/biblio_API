const Article = require("../models").Article;
const Op = require("sequelize").Op;
const HttpError = require("../misc/Errors/HttpError");

exports.getArticles = async (req, res, next) => {
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
    const totalCount = await Article.count();
    const Articles = await Article.findAll({
      ...search,
      subQuery: false,
      offset: offset,
      ...(!tous ? { limit: limit } : {}),
    });
    res.status(200).json({ totalCount, Articles });
  } catch (error) {
    console.log(error);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const Article = await Article.findByPk(id);
    if (!Article)
      return next(new HttpError(404, "il n'ya pas de Article avec ce id"));
    res.status(200).json(Article);
  } catch (error) {
    console.log(error); 
  }
};

exports.createArticle = async (req, res, next) => {
  try { 
    const { nom } = req.body;
    let createdArticle = new Article({
      conference,
    });
    await createdArticle.save();
    res.status(201).json({ message: "Article créé" });
  } catch (error) {
    console.log(error);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Taille.update(req.body, { where: { id: id } });
    res.status(200).json({ message: "updated Article" });
  } catch (error) { 
    console.log(error);
  }
}; 

exports.deleteArticle = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    await Article.destroy({ where: { id: id } });
    res.status(200).json({ message: "supprimé  Article" }); 
  } catch (error) {
    console.log(error);
  }
};
