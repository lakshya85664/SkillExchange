const SubCategoryModel = require("../models/SubCategoryModel");

const getAllSubCategories = async (req, res) => {
    const subCategory = await SubCategoryModel.find().populate("categoryId");
    res.json({
        message: "Sub Categories found",
        data: subCategory
    });
};

const addSubCategory = async (req, res) => {
    const savedSubCategory = await SubCategoryModel.create(req.body);
    res.json({
        message: "SubCategory created",
        data: savedSubCategory
    });
};

const deleteSubCategory = async (req, res) => {
    const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
    res.json({
        message: "SubCategory deleted successfully",
        data: deletedSubCategory
    });
};

const getSubCategoryByCategoryId = async (req, res) => {
    const getSubCategory = await SubCategoryModel.find({categoryId: req.params.categoryId});
    res.json({
        message: "Sub Category found",
        data: getSubCategory
    });
};

const getSubCategoryByUserId = async (req, res) => {
    const getSubCategory = await SubCategoryModel.find({userId: req.params.userId});
    res.json({
        message: "Sub Category found",
        data: getSubCategory
    });
};

const getTopRatedSubCategories = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const subCategories = await SubCategoryModel.find()
            .sort({ averageRating: -1 })
            .limit(limit);
            
        res.json({
            message: "Top rated subcategories found",
            data: subCategories
        });
    } catch (error) {
        console.error("Error fetching top rated subcategories:", error);
        res.status(500).json({
            message: "Failed to fetch top rated subcategories",
            error: error.message
        });
    }
};

module.exports = {
    getAllSubCategories, addSubCategory, deleteSubCategory, getSubCategoryByCategoryId, getSubCategoryByUserId, getTopRatedSubCategories
}