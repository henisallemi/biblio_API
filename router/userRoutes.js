const router = require("express").Router();
const UserController = require("../controllers/userController"); 

router.get("/", UserController.getUsers);   

router.get("/:id", UserController.getUserById); 

router.get("/role/:role", UserController.getUersByRole); 

router.post("/", UserController.createUser);

router.post("/login", UserController.login);
 
router.delete("/:id", UserController.deleteUser);

router.put("/:id", UserController.updateUser);
 
module.exports = router;    
   