const router = require("express").Router();
const OuvrageController = require("../controllers/OuvrageController"); 

router.post("/emprunt", OuvrageController.check)

router.post("/return", OuvrageController.retour)

 
module.exports = router;   
  