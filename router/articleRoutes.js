const router = require("express").Router();
const ArticleController = require("../controllers/articleController");

router.get("/", ArticleController.getArticles);    

router.get("/:id", ArticleController.getArticleById); 

router.post("/", ArticleController.createArticle);

router.delete("/:id", ArticleController.deleteArticle);

router.put("/:id", ArticleController.updateArticle);
 
module.exports = router;  
 