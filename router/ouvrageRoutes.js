const router = require("express").Router();
const OuvrageController = require("../controllers/OuvrageController"); 

router.post("/emprunt", OuvrageController.check)
 
module.exports = router;   
  