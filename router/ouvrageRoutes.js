const router = require("express").Router();
const OuvrageController = require("../controllers/ouvrageController"); 

router.post("/emprunt", OuvrageController.check)
 
module.exports = router;   
  