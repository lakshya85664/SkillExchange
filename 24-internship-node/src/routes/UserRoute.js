const routes = require("express").Router()
const userController = require("../controllers/UserController")

const upload = require("../middlewares/UploadProfilePic");

routes.get("/getallusers",userController.getAllUsers);
//routes.post("/users",userController.addUser);
routes.post("/users",userController.signup);
routes.delete("/deleteuser/:id",userController.deleteUser);
routes.get("/getuserbyid/:id",userController.getUserById);
routes.post("/users/login",userController.loginUser);
routes.post("/adduserpic",userController.addUserWithFile);
// routes.put("/updateuser/:id",userController.updateUser);
routes.put("/getuserbyidandupdate/:id",userController.getUserByIdandUpdate);
routes.post("/forgotpassword",userController.forgotPassword);
routes.post("/resetpassword",userController.resetpassword);
routes.put("/getuserbyidandupdatepic/:id", upload.single("profilePic"), userController.getUserByIdandUpdatePic);
routes.post("/logout/:id", userController.logoutUser);
routes.get("/top-rated", userController.getTopRatedUsers);
// Add new route
routes.get("/check-status/:id", userController.checkUserStatus);

module.exports = routes;

