const router = require("express").Router();
const AdminController = require("../controllers/AdminController");

router.get("/", AdminController.getAdmins);  

router.get("/:id", AdminController.getAdminById); 

router.post("/", AdminController.createAdmin);

router.delete("/:id", AdminController.deleteAdmin);

router.patch("/:id", AdminController.updateAdmin);
 
module.exports = router;              
  