const { Article, Ouvrage, Emprunt, User } = require("../model");
const Sequelize = require("sequelize");
const HttpError = require("../misc/Errors/HttpError");

exports.getArticles = async (req, res, next) => {
  try { 
    let { page, limit, recherche, target } = req.query;
    const likeObj = recherche ? { [Sequelize.Op.like]: `%${recherche}%` } : null;

    limit = parseInt(limit) || 15; 
    page = parseInt(page) || 1;
    target = target ?? ""; 
    console.log(target)
    const offset = limit * (page - 1);
    const totalCount = await Article.count();
    const articles = await Article.findAll({
      include: [ 
        {
          model: Ouvrage,
          options: { eager: true },
          as: "ouvrage",
          where: target && likeObj ? {   
                [Sequelize.Op.or]: [ 
                  target == 1
                  ? { titre: likeObj }
                  : target == 2
                  ? { auteur1: likeObj }    
                  : target == 3
                  ? { date: likeObj }
                  : {} 
                ],
              } : {}, 
        },   
      ],
      subQuery: false,
      offset: offset,
      limit: limit,

    });
    res.status(200).json({ totalCount, articles });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    let { id } = req.params;
    id = Number.parseInt(id);
    const article = await Article.findByPk(id);
    if (!article) 
      return next(new HttpError(404, "il n'ya pas de article avec ce id"));
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
  }
};

exports.createArticle = async (req, res, next) => {
  try { 
    console.log(req.body);
    let createdArticle = await Article.create({ ...req.body }); 
    let createdOuvrage = await Ouvrage.create({ ...req.body, articleId: createdArticle.id, nombreDisponible: req.body.nombreExemplaire });

    await createdArticle.setOuvrage(createdOuvrage);

    res.status(201).json({ article: createdArticle }); 
  } catch (error) {
    console.log(error); 
  }
};  

exports.updateArticle = async (req, res, next) => {
  try {
    let { id } = req.params; 
    let body = req.body;
    id = Number.parseInt(id);
    const article = await Article.findOne({ where: { id }, include: { model: Ouvrage, eager: true, as: "ouvrage" } });

    await Article.update(body, { where: { id } });
    await Ouvrage.update(body, { where: { id: article.ouvrage.id } })
    res.status(200).json({ message: "updated article" });
  } catch (error) {
    console.log(error); 
  }
}; 

exports.deleteArticle = async (req, res, next) => {
  try {
    let { id } = req.params; 
    id = Number.parseInt(id); 
    await Article.destroy({ where: { id } })
    res.status(200).json({ message: "supprimé  article" });
  } catch (error) {
    console.log(error);
  }
};
