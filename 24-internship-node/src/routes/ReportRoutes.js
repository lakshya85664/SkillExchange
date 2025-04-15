const routes = require("express").Router();
const reportController = require("../controllers/ReportController")

routes.post("/create", reportController.createReport);
routes.get("/view", reportController.getAllReports);

module.exports = routes;