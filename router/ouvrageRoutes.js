const router = require("express").Router();
const OuvrageController = require("../controllers/OuvrageController");

router.get("/", OuvrageController.getOuvrages);  

router.get("/:id", OuvrageController.getOuvrageById); 

router.post("/", OuvrageController.createOuvrage);

router.delete("/:id", OuvrageController.deleteOuvrage);

router.patch("/:id", OuvrageController.updateOuvrage);
 
module.exports = router;   
 