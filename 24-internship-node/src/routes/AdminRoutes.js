const routes = require("express").Router()
const adminController = require("../controllers/AdminController")
const upload = require("../middlewares/UploadProfilePic");

routes.get("/getalladmins",adminController.getAllAdmins);
//routes.post("/users",userController.addUser);
routes.post("/signup",adminController.signup);
routes.delete("/deleteadmin/:id",adminController.deleteAdmin);
routes.get("/getadminbyid/:id",adminController.getAdminById);
routes.post("/login",adminController.loginAdmin);
routes.post("/addadminpic",adminController.addAdminWithFile);
routes.put("/getadminbyidandupdate/:id",adminController.getAdminByIdandUpdate);
routes.put("/getadminbyidandupdatepic/:id", upload.single("profilePic"), adminController.getAdminByIdandUpdatePic);
// Add to AdminRoutes.js
routes.get("/stats", adminController.getAdminStats);

module.exports = routes;