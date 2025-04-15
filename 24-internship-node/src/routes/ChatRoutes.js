// const routes = require("express").Router();
// const chatController = require("../controllers/ChatController");



// module.exports = routes;

const routes = require("express").Router();
const chatController = require("../controllers/ChatController");
const multer = require('multer');
// const upload = multer({ dest: 'uploads/' }); // Configure as needed
const upload = multer({
    dest: 'uploads/',
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 5 // Max 5 files
    }
});

// routes.post("/send", chatController.sendMessage);
routes.post("/send", upload.array('attachments', 5), chatController.sendMessage);
routes.get("/:matchId", chatController.getMessages);
routes.post("/complete", chatController.markSkillExchangeCompleted);
routes.get("/user/:userId", chatController.getDistinctMatchesByUser);

module.exports = routes;