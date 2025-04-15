const CategoryModel = require("../models/CategoryModel");

// const getAllCategories = async (req, res) => {
//     const category = await CategoryModel.find();
//     res.json({
//         message: "Categories found",
//         data: category
//     });
// };

const getAllCategories = async (req, res) => {
    try {
        const categories = await CategoryModel.find();
        res.json({
            message: "Categories found",
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching categories",
            error: error.message
        });
    }
};

const addCategory = async (req, res) => {
    const savedCategory = await CategoryModel.create(req.body);
    res.json({
        message: "Category created",
        data: savedCategory
    });
};

const deleteCategory = async (req, res) => {
    const deletedCategory = await CategoryModel.findByIdAndDelete(req.params.id);
    res.json({
        message: "Category deleted successfully",
        data: deletedCategory
    });
};

const getCategoryById = async (req, res) => {
    const getCategory = await CategoryModel.findById(req.params.id);
    res.json({
        message: "Category found",
        data: getCategory
    });
};

const getCategoryByUserId = async (req, res) => {
    const getCategory = await CategoryModel.find({userId: req.params.userId});
    res.json({
        message: "Category found",
        data: getCategory
    });
};

module.exports = {
    getAllCategories, addCategory, deleteCategory, getCategoryById, getCategoryByUserId
}