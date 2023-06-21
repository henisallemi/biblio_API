const router = require("express").Router();
const LivreController = require("../controllers/LivreController");

router.get("/", LivreController.getLivres);  

router.get("/:id", LivreController.getLivreById); 

router.post("/", LivreController.createLivre);

router.delete("/:id", LivreController.deleteLivre);

router.patch("/:id", LivreController.updateLivre);
 
module.exports = router;   
 