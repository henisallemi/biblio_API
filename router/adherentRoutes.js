const router = require("express").Router();
const AdherentController = require("../controllers/AdherentController");

router.get("/", AdherentController.getAdherents);  

router.get("/:id", AdherentController.getAdherentById); 

router.post("/", AdherentController.createAdherent);

router.delete("/:id", AdherentController.deleteAdherent);

router.patch("/:id", AdherentController.updateAdherent);
 
module.exports = router;              
 