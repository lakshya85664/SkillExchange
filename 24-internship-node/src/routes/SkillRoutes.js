const routes = require("express").Router()
const skillController = require("../controllers/SkillController")

routes.get("/getallskills",skillController.getAllSkills);
routes.delete("/deleteskill/:id",skillController.deleteSkill);
routes.get("/getskillbyid/:id",skillController.getSKillById);
routes.post("/addskill",skillController.addSkill);
routes.put("/updateskill/:id",skillController.updateSkill);
routes.get("/getskillbyidandupdate",skillController.getSkillByIdandUpdate);
routes.get("/getskillbyuserid/:skillName",skillController.getSkillByUserId);
routes.get("/getskillsbyuserid/:userId",skillController.getSkillsByUserId);
routes.delete("/deleteskillbyuser/:userId/:skillName", skillController.deleteSkillByUser);

module.exports = routes;