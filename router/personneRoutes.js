const router = require("express").Router();
const PersonneController = require("../controllers/personneController"); 

router.get("/", PersonneController.getPersonnes);   

router.get("/:id", PersonneController.getPersonneById); 

router.post("/", PersonneController.createPersonne);

router.delete("/:id", PersonneController.deletePersonne);

router.patch("/:id", PersonneController.updatePersonne);
 
module.exports = router;   
  