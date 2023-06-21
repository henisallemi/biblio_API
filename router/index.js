const router = require("express").Router();
const utilisateurRoutes = require("./utilisateurRoutes");
const livreRoutes = require("./livreRoutes");
const articleRoutes = require("./articleRoutes");
const revueRoutes = require("./revueRoutes");
const ouvrageRoutes = require("./ouvrageRoutes");  

router.use("/users", utilisateurRoutes);
router.use("/livres",livreRoutes);
router.use("/articles",articleRoutes);
router.use("/revues",revueRoutes);
router.use("/ouvrages",ouvrageRoutes);     

module.exports = router;
