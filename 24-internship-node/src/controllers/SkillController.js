const SkillModel = require("../models/SkillModel");
const UserModel = require("../models/UserModel");

const getAllSkills = async (req, res) => {
  try {
      const skills = await SkillModel.find()
          .populate('categoryId', 'name') // Populate category name
          .populate('userId', 'userName email profilePic'); // Populate user info if needed

      res.json({
          message: "Skills found",
          data: skills
      });
  } catch (error) {
      res.status(500).json({
          message: "Error fetching skills",
          error: error.message
      });
  }
};

// const getAllSkills = async (req, res) => {
//   try {
//     let query = {};
    
//     // Add category filter if provided
//     if (req.query.categoryId) {
//       query.categoryId = req.query.categoryId;
//     }

//     const skills = await SkillModel.aggregate([
//       { $match: query },
//       {
//         $group: {
//           _id: "$name",
//           doc: { $first: "$$ROOT" } // Keep the first document for each skill name
//         }
//       },
//       {
//         $replaceRoot: { newRoot: "$doc" } // Restore the original document structure
//       },
//       {
//         $lookup: {
//           from: "users",
//           localField: "userId",
//           foreignField: "_id",
//           as: "user"
//         }
//       },
//       {
//         $unwind: "$user"
//       },
//       {
//         $lookup: {
//           from: "categories",
//           localField: "categoryId",
//           foreignField: "_id",
//           as: "category"
//         }
//       },
//       {
//         $unwind: {
//           path: "$category",
//           preserveNullAndEmptyArrays: true
//         }
//       }
//     ]);

//     res.json({
//       message: "Unique skills found",
//       data: skills
//     });
//   } catch (error) {
//     console.error("Error fetching unique skills:", error);
//     res.status(500).json({
//       message: "Error fetching skills",
//       error: error.message
//     });
//   }
// };

const addSkill = async (req, res) => {
  const savedSkill = await SkillModel.create(req.body);
  res.json({
    message: "Skill created",
    data: savedSkill
  });
};

const deleteSkill = async (req, res) => {
  const deletedSkill = await SkillModel.findByIdAndDelete(req.params.id);
  res.json({
    message: "Skill deleted successfully",
    data: deletedSkill
  });
};

const getSKillById = async (req, res) => {
  const getSkill = await SkillModel.findById(req.params.id);
  res.json({
    message: "Skill found",
    data: getSkill
  });
};

const getSkillByIdandUpdate = async (req, res) => {
  //update tablename set  ? where id = ?
  //update new data -->req.body
  //id -->req.params.id

  try {
    const updatedSkill = await SkillModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({
      message: "Skill updated successfully",
      data: updatedSkill
    });
  } catch (err) {
    res.status(500).json({
      message: "error while updating skill",
      err: err,
    });
  }
};

const updateSkill = async (req, res) => {

  try {
    const updateDoctor = await SkillModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    res.status(200).json({
      message: "Skill Updated Successfully",
      data: updateDoctor
    })

  } catch (err) {
    res.status(500).json({
      messgae: "error while updating skill",
      err: err,
    })
  }
}

const getSkillsByUserId = async (req, res) => {
  const getSkill = await SkillModel.find({userId: req.params.userId}).populate("name","userId");
   res.json({
       message: "Skill found",
       data: getSkill
   });
};

const getSkillByUserId = async (req, res) => {
  //  const getSkill = await SkillModel.find({userId: req.params.userId}).populate("name","userId");
  //  res.json({
  //      message: "Skill found",
  //      data: getSkill
  //  });
  try {
    // First find all skills with this name
    const skills = await SkillModel.find({ name: req.params.skillName });

    // Get unique user IDs
    const userIds = [...new Set(skills.map(skill => skill.userId))];

    // Find all users with these IDs
    const users = await UserModel.find({ _id: { $in: userIds } });

    res.json({
      message: "Users with skill found",
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users with skill",
      error: error.message
    });
  }
};

// Add this route to SkillRoutes.js
//   const getskillbyuserid =  async (req, res) => {
//   try {
//       // First find all skills with this name
//       const skills = await SkillModel.find({ name: req.params.skillName });

//       // Get unique user IDs
//       const userIds = [...new Set(skills.map(skill => skill.userId))];

//       // Find all users with these IDs
//       const users = await UserModel.find({ _id: { $in: userIds } });

//       res.json({
//           message: "Users with skill found",
//           data: users
//       });
//   } catch (error) {
//       res.status(500).json({
//           message: "Error fetching users with skill",
//           error: error.message
//       });
//   }
// });

const deleteSkillByUser = async (req, res) => {
  try {
    const { skillName } = req.params;
    const userId = req.params.userId;
    
    const deletedSkill = await SkillModel.findOneAndDelete({
      name: skillName,
      userId: userId
    });

    if (!deletedSkill) {
      return res.status(404).json({
        message: "Skill not found for this user"
      });
    }

    res.json({
      message: "Skill removed successfully",
      data: deletedSkill
    });
  } catch (error) {
    res.status(500).json({
      message: "Error removing skill",
      error: error.message
    });
  }
};

module.exports = {
  getAllSkills, addSkill, deleteSkill, getSKillById, updateSkill, getSkillByIdandUpdate, getSkillByUserId, getSkillsByUserId, deleteSkillByUser
}