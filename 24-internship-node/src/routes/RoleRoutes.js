const routes = require("express").Router()
const roleController = require('../controllers/RoleController')

routes.get("/getallroles",roleController.getAllRoles);
routes.post('/addrole',roleController.addRole);
routes.delete("/deleterole/:id",roleController.deleteRole);
routes.get("/getrolebyid/:id",roleController.getRoleById);

module.exports = routes;