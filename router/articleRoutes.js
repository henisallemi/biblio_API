const router = require("express").Router();
const ArticleController = require("../controllers/ArticleController");

router.get("/", ArticleController.getArticles);  

router.get("/:id", ArticleController.getArticleById); 

router.post("/", ArticleController.createArticle);

router.delete("/:id", ArticleController.deleteArticle);

router.patch("/:id", ArticleController.updateArticle);
 
module.exports = router;  
 