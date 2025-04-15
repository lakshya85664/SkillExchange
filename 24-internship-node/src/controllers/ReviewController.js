// const ReviewModel = require("../models/ReviewModel");
// const SkillModel = require("../models/SkillModel");
// const SubCategoryModel = require("../models/SubCategoryModel");
// const { updateUserRating } = require("../utils/RatingUtils");

// // const getAllReviews = async (req, res) => {
// //     const review = await ReviewModel.find().populate("reviewerId reviewedId subcategoryId");
// //     res.json({
// //         message: "Sub Categories found",
// //         data: review
// //     });
// // };

// const getAllReviews = async (req, res) => {
//     try {
//         let query = {};
//         if (req.query.reviewerId) {
//             query.reviewerId = req.query.reviewerId;
//         }

//         const reviews = await ReviewModel.find(query)
//             .populate({
//                 path: 'reviewerId reviewedId',
//                 select: 'userName profilePic'
//             })
//             .populate({
//                 path: 'subcategoryId',
//                 select: 'name'
//             });

//         res.json({
//             message: "Reviews found",
//             data: reviews
//         });
//     } catch (err) {
//         console.error("Error fetching reviews:", err);
//         res.status(500).json({
//             message: "Failed to fetch reviews",
//             error: err.message
//         });
//     }
// };

// // const addReviews = async (req, res) => {
// //     try {
// //         const { reviewerId, reviewedId, skillName, rating, feedback } = req.body;

// //         // Validate required fields
// //         if (!reviewerId || !reviewedId || !skillName || !rating) {
// //             return res.status(400).json({
// //                 message: "Missing required fields (reviewerId, reviewedId, skillName, rating)"
// //             });
// //         }

// //         // Find a skill with this name to get the subcategory ID
// //         const skill = await SkillModel.findOne({ name: skillName })
// //             .populate('subcategoryId');

// //         if (!skill) {
// //             return res.status(404).json({
// //                 message: "Skill not found"
// //             });
// //         }

// //         if (!skill.subcategoryId) {
// //             return res.status(404).json({
// //                 message: "Subcategory not found for this skill"
// //             });
// //         }

// //         const newReview = {
// //             reviewerId,
// //             reviewedId,
// //             subcategoryId: skill.subcategoryId._id,
// //             rating,
// //             feedback: feedback || null
// //         };

// //         const savedReviews = await ReviewModel.create(newReview);

// //         // Update the reviewed user's average rating
// //         await updateUserRating(reviewedId);

// //         res.status(201).json({
// //             message: "Review added successfully",
// //             data: savedReviews
// //         });


// //         res.status(201).json({
// //             message: "Review added successfully",
// //             data: savedReviews
// //         });
// //     } catch (err) {
// //         console.error("Error adding review:", err);
// //         res.status(500).json({
// //             message: "Failed to add review",
// //             error: err.message
// //         });
// //     }
// // };

// // In ReviewController.js, update the addReviews function:
// const addReviews = async (req, res) => {
//     try {
//         const { reviewerId, reviewedId, skillName, rating, feedback } = req.body;

//         // Validate required fields
//         if (!reviewerId || !reviewedId || !skillName || !rating) {
//             return res.status(400).json({
//                 message: "Missing required fields (reviewerId, reviewedId, skillName, rating)"
//             });
//         }

//         // Find a skill with this name to get the subcategory ID
//         const skill = await SkillModel.findOne({ name: skillName })
//             .populate('subcategoryId');

//         if (!skill) {
//             return res.status(404).json({
//                 message: "Skill not found"
//             });
//         }

//         if (!skill.subcategoryId) {
//             return res.status(404).json({
//                 message: "Subcategory not found for this skill"
//             });
//         }

//         const newReview = {
//             reviewerId,
//             reviewedId,
//             subcategoryId: skill.subcategoryId._id,
//             rating,
//             feedback: feedback || null
//         };

//         const savedReviews = await ReviewModel.create(newReview);

//         // Update the reviewed user's average rating
//         await updateUserRating(reviewedId);

//         res.status(201).json({
//             message: "Review added successfully",
//             data: savedReviews
//         });
//     } catch (err) {
//         console.error("Error adding review:", err);
//         res.status(500).json({
//             message: "Failed to add review",
//             error: err.message
//         });
//     }
// };

// const deleteReviews = async (req, res) => {
//     const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
//     res.json({
//         message: "Review deleted successfully",
//         data: deletedReview
//     });
// };

// const getReviewById = async (req, res) => {
//     const getReview = await ReviewModel.findById(req.params.id);
//     res.json({
//         message: "Review found",
//         data: getReview
//     });
// };

// module.exports = {
//     getAllReviews, addReviews, deleteReviews, getReviewById
// }

const ReviewModel = require("../models/ReviewModel");
const SkillModel = require("../models/SkillModel");
const UserModel = require("../models/UserModel");
const SubCategoryModel = require("../models/SubCategoryModel");
const { updateUserRatingAndSkills } = require("../utils/RatingUtils");
const { updateSubCategoryRating } = require("../utils/RatingUtils");
const {
    sendingMail,
    sendRatingNotification
} = require("../utils/MailUtils");

const getAllReviews = async (req, res) => {
    try {
        let query = {};
        if (req.query.reviewerId) {
            query.reviewerId = req.query.reviewerId;
        }

        const reviews = await ReviewModel.find(query)
            .populate({
                path: 'reviewerId reviewedId',
                select: 'userName profilePic'
            })
            .populate({
                path: 'subcategoryId',
                select: 'name'
            });

        res.json({
            message: "Reviews found",
            data: reviews
        });
    } catch (err) {
        console.error("Error fetching reviews:", err);
        res.status(500).json({
            message: "Failed to fetch reviews",
            error: err.message
        });
    }
};

// const addReviews = async (req, res) => {
//     try {
//         console.log("Incoming review data:", req.body); // Add this for debugging
//         const { reviewerId, reviewedId, skillName, userRating, skillRating, feedback } = req.body;

//         // // Validate required fields
//         // if (!reviewerId || !reviewedId || !skillName || !userRating || !skillRating) {
//         //     return res.status(400).json({
//         //         message: "Missing required fields (reviewerId, reviewedId, skillName, userRating, skillRating)"
//         //     });
//         // }

//         // Validate required fields
//         if (!reviewerId || !reviewedId || !skillName || !userRating || !skillRating) {
//             console.log("Missing fields:", { reviewerId, reviewedId, skillName, userRating, skillRating });
//             return res.status(400).json({
//                 message: "Missing required fields (reviewerId, reviewedId, skillName, userRating, skillRating)"
//             });
//         }

//         // Find a skill with this name to get the subcategory ID
//         // const skill = await SkillModel.findOne({ name: skillName })
//         //     .populate('subcategoryId');

//         const skill = await SkillModel.findOne({ name: skillName }).populate('subcategoryId');
//         console.log("Found skill:", skill); // Add this


//         if (!skill) {
//             console.log(`Skill not found: ${skillName}`);
//             return res.status(404).json({
//                 message: "Skill not found"
//             });
//         }

//         if (!skill.subcategoryId) {
//             return res.status(404).json({
//                 message: "Subcategory not found for this skill"
//             });
//         }

//         const newReview = {
//             reviewerId,
//             reviewedId,
//             subcategoryId: skill.subcategoryId._id,
//             userRating,
//             skillRating,
//             feedback: feedback || null
//         };

//         const savedReviews = await ReviewModel.create(newReview);

//         // Update the reviewed user's average rating
//         await updateUserRating(reviewedId);

//         res.status(201).json({
//             message: "Review added successfully",
//             data: savedReviews
//         });
//     } catch (err) {
//         console.error("Error adding review:", err);
//         res.status(500).json({
//             message: "Failed to add review",
//             error: err.message
//         });
//     }
// };

// const addReviews = async (req, res) => {
//     try {
//         const { reviewerId, reviewedId, skillName, userRating, skillRating, feedback } = req.body;

//         // Validate required fields
//         if (!reviewerId || !reviewedId || !skillName || !userRating || !skillRating) {
//             return res.status(400).json({
//                 message: "Missing required fields"
//             });
//         }

//         // Validate rating values (1-5)
//         if (userRating < 1 || userRating > 5 || skillRating < 1 || skillRating > 5) {
//             return res.status(400).json({
//                 message: "Ratings must be between 1 and 5"
//             });
//         }

//         const skill = await SkillModel.findOne({ name: skillName }).populate('subcategoryId');
//         if (!skill || !skill.subcategoryId) {
//             return res.status(404).json({
//                 message: "Skill or subcategory not found"
//             });
//         }

//         const newReview = {
//             reviewerId,
//             reviewedId,
//             subcategoryId: skill.subcategoryId._id,
//             userRating: Number(userRating),
//             skillRating: Number(skillRating),
//             feedback: feedback || null
//         };

//         const savedReview = await ReviewModel.create(newReview);

//         // Update only user rating average (not skill rating)
//         await updateUserRating(reviewedId);

//         res.status(201).json({
//             message: "Review added successfully",
//             data: savedReview
//         });

//     } catch (err) {
//         console.error("Error adding review:", err);
//         res.status(500).json({
//             message: "Failed to add review",
//             error: err.message
//         });
//     }
// };

const addReviews = async (req, res) => {
    try {
        const { reviewerId, reviewedId, skillName, userRating, skillRating, feedback } = req.body;

        // Validate inputs
        if (!reviewerId || !reviewedId || !skillName || !userRating || !skillRating) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Find the skill
        const skill = await SkillModel.findOne({ name: skillName }).populate('subcategoryId');
        if (!skill || !skill.subcategoryId) {
            return res.status(404).json({ message: "Skill not found" });
        }

        // Create the review
        const newReview = {
            reviewerId,
            reviewedId,
            subcategoryId: skill.subcategoryId._id,
            userRating: Number(userRating),
            skillRating: Number(skillRating),
            feedback: feedback || null
        };

        const savedReview = await ReviewModel.create(newReview);

        // Update user's rating AND add the skill to their profile
        await updateUserRatingAndSkills(reviewedId, skillName);

        // Update subcategory average rating
        await updateSubCategoryRating(skill.subcategoryId._id);

        // Get user details for notification
        const reviewer = await UserModel.findById(reviewerId);
        const reviewedUser = await UserModel.findById(reviewedId);

        // Send notification email to the reviewed user
        await sendRatingNotification(
            reviewedUser.email,
            reviewedUser.userName,
            reviewer.userName,
            skillName,
            userRating,
            skillRating,
            feedback
        );

        res.status(201).json({
            message: "Review added successfully",
            data: savedReview
        });

    } catch (err) {
        console.error("Error adding review:", err);
        res.status(500).json({
            message: "Failed to add review",
            error: err.message
        });
    }
};

// const deleteReviews = async (req, res) => {
//     const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
//     res.json({
//         message: "Review deleted successfully",
//         data: deletedReview
//     });
// };

// Modify the deleteReviews function:
const deleteReviews = async (req, res) => {
    try {
        const review = await ReviewModel.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }

        const deletedReview = await ReviewModel.findByIdAndDelete(req.params.id);
        
        // Update user's rating
        await updateUserRatingAndSkills(deletedReview.reviewedId);
        
        // Update subcategory average rating
        await updateSubCategoryRating(deletedReview.subcategoryId);

        res.json({
            message: "Review deleted successfully",
            data: deletedReview
        });
    } catch (error) {
        console.error("Error deleting review:", error);
        res.status(500).json({
            message: "Failed to delete review",
            error: error.message
        });
    }
};

const getReviewById = async (req, res) => {
    const getReview = await ReviewModel.findById(req.params.id);
    res.json({
        message: "Review found",
        data: getReview
    });
};

module.exports = {
    getAllReviews, addReviews, deleteReviews, getReviewById
}