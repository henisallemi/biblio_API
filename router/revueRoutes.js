const router = require("express").Router();
const RevueController = require("../controllers/RevueController");

router.get("/", RevueController.getRevues);  
  
router.get("/:id", RevueController.getRevueById); 

router.post("/", RevueController.createRevue);

router.delete("/:id", RevueController.deleteRevue);

router.put("/:id", RevueController.updateRevue); 
 
module.exports = router;     
     