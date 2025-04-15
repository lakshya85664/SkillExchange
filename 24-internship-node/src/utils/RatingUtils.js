const UserModel = require("../models/UserModel");
const ReviewModel = require("../models/ReviewModel");
const SkillModel = require("../models/SkillModel");
const SubCategoryModel = require("../models/SubCategoryModel")

const updateUserRatingAndSkills = async (userId, skillName) => {
    try {
        // 1. Update user average rating (same as before)
        const reviews = await ReviewModel.find({ reviewedId: userId });
        
        if (reviews.length > 0) {
            const totalUserRating = reviews.reduce((sum, review) => sum + review.userRating, 0);
            const avgUserRating = totalUserRating / reviews.length;

            await UserModel.findByIdAndUpdate(userId, {
                averageRating: avgUserRating,
                reviewCount: reviews.length
            });
        }

        // 2. Update user's skills array with the reviewed skill
        const skill = await SkillModel.findOne({ name: skillName });
        
        if (skill) {
            await UserModel.findByIdAndUpdate(
                userId,
                { $addToSet: { skills: skill._id } }, // $addToSet prevents duplicates
                { new: true }
            );
        }

    } catch (err) {
        console.error("Error updating user rating and skills:", err);
        throw err;
    }
};

const updateSubCategoryRating = async (subcategoryId) => {
    try {
        // Calculate average rating from reviews
        const result = await ReviewModel.aggregate([
            { $match: { subcategoryId: subcategoryId } },
            {
                $group: {
                    _id: "$subcategoryId",
                    averageRating: { $avg: "$skillRating" },
                    count: { $sum: 1 }
                }
            }
        ]);

        if (result.length > 0) {
            const { averageRating, count } = result[0];
            await SubCategoryModel.findByIdAndUpdate(subcategoryId, {
                averageRating: parseFloat(averageRating.toFixed(2)),
                ratingCount: count
            });
        } else {
            // No reviews yet, reset to default
            await SubCategoryModel.findByIdAndUpdate(subcategoryId, {
                averageRating: 0,
                ratingCount: 0
            });
        }
    } catch (error) {
        console.error("Error updating subcategory rating:", error);
    }
};

module.exports = { updateUserRatingAndSkills, updateSubCategoryRating};