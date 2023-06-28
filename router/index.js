const router = require("express").Router();

const livreRoutes = require("./livreRoutes");
const articleRoutes = require("./articleRoutes");
const revueRoutes = require("./revueRoutes");
const ouvrageRoutes = require("./ouvrageRoutes");  
const userRoutes = require("./userRoutes");  
 

router.use("/livres",livreRoutes);     
router.use("/articles",articleRoutes);
router.use("/revues",revueRoutes);
router.use("/ouvrages",ouvrageRoutes);   
router.use("/users",userRoutes);     
 
module.exports = router;  
 