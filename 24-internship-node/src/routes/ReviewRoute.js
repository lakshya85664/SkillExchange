const routes = require("express").Router()
const reviewController = require("../controllers/ReviewController")

routes.get("/review",reviewController.getAllReviews);
routes.delete("/review/:id",reviewController.deleteReviews);
routes.get("/review/:id",reviewController.getReviewById);
routes.post("/review",reviewController.addReviews);

module.exports = routes;