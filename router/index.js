const router = require("express").Router();

const livreRoutes = require("./livreRoutes");
const articleRoutes = require("./articleRoutes");
const revueRoutes = require("./revueRoutes");
const ouvrageRoutes = require("./ouvrageRoutes");  
const personneRoutes = require("./personneRoutes");  
const adminRoutes = require("./adminRoutes");   
const adherentRoutes = require("./adherentRoutes");  
router.use("/livres",livreRoutes); 
router.use("/articles",articleRoutes);
router.use("/revues",revueRoutes);
router.use("/ouvrages",ouvrageRoutes);   
router.use("/personnes",personneRoutes);     
router.use("/adherents",adherentRoutes);  
router.use("/admins",adminRoutes);    

module.exports = router;
 