const router = require("express").Router();
const StatisticsController = require("../controllers/StatisticsController"); 

router.get("/stats", StatisticsController.getAdminDashboard)

 
module.exports = router;   
  