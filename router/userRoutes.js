const router = require("express").Router();
const UserController = require("../controllers/UserController");
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const ext = path.extname(originalName);
        const fileName = Date.now() + ext;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage });

router.get("", UserController.getUsers);

router.get("/:id", UserController.getUserById);

router.get("/history/:id", UserController.getHistory);

router.get("/role/:role", UserController.getUersByRole);

router.post("", upload.single('image'), UserController.createUser);

router.post("/login", UserController.login);

router.post("/:id", upload.single('image'), UserController.updateUser);

router.delete("/:id", UserController.deleteUser);


module.exports = router;
