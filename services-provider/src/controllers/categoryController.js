import categoryModel from "../models/categoryModels.js";

const createCategory = async (req, res) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "category name is required" });
  }

  try {
    const category = await categoryModel.create({ category });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createCategory, getCategories };
