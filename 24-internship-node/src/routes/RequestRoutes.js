// const routes = require("express").Router()
// const requestController = require("../controllers/RequestController")

// module.exports = routes;

// RequestRoutes.js
const routes = require("express").Router();
const requestController = require("../controllers/RequestController");

routes.post("/send", requestController.sendRequest);
routes.get("/receiver/:userId", requestController.getRequestsByReceiver);
routes.put("/:id/status", requestController.updateRequestStatus);
routes.get("/sender/:userId", requestController.getSentRequests);
routes.post("/accept", requestController.acceptRequest);

module.exports = routes;