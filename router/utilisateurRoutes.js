const router = require("express").Router();
const utilisateurController = require("../controllers/utilisateurController");

router.get("", utilisateurController.getAllUsers);


router.post("", utilisateurController.create);

module.exports = router; 