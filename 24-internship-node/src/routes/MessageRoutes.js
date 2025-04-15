const routes = require("express").Router();
const messageController = require("../controllers/MessageController");

// Create a new match
routes.post("/matches", messageController.createMatch);

// Get all matches for a user
routes.get("/matches/:userId", messageController.getUserMatches);

routes.post("/check-match", messageController.checkAndCreateMatch);

routes.get("/match/:matchId", messageController.getMatchById);

routes.post("/complete", messageController.markSkillExchangeCompleted);

// Add to MessageRoutes.js
routes.get("/completed/:userId", messageController.getCompletedExchanges);

module.exports = routes;