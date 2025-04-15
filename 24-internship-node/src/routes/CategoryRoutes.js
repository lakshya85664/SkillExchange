const routes = require("express").Router()
const categoryController = require("../controllers/CategoryController")

routes.get("/getallcategories",categoryController.getAllCategories);
routes.delete("/deletecategory/:id",categoryController.deleteCategory);
routes.get("/getcategorybyid/:id",categoryController.getCategoryById);
routes.get("/getcategorybyuserid/:userId",categoryController.getCategoryByUserId);
routes.post("/addcategory",categoryController.addCategory);

module.exports = routes;