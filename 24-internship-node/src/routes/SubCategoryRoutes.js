const routes = require("express").Router()
const subCategoryController = require("../controllers/SubCategoryController")

routes.get("/getallsubcategories",subCategoryController.getAllSubCategories);
routes.delete("/deletesubcategory/:id",subCategoryController.deleteSubCategory);
routes.get("/getsubcategorybycategoryid/:categoryId",subCategoryController.getSubCategoryByCategoryId);
routes.get("/getsubcategorybyuserid/:userId",subCategoryController.getSubCategoryByUserId);
routes.post("/addsubcategory",subCategoryController.addSubCategory);
routes.get("/gettopratedsubcategories", subCategoryController.getTopRatedSubCategories);

module.exports = routes;