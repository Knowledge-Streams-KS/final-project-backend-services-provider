import Category from "../models/categoryModels.js";
import createCategorySchema from "../middlewares/schemas/categorySchema.js";

const categoryController = {
  createCategory: async (req, res) => {
    const { error } = createCategorySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { categoryName } = req.body;

    try {
      const existingCategory = await Category.findOne({
        where: { categoryName },
      });
      if (existingCategory) {
        return res.status(400).json({ message: "Category already exists" });
      }

      const category = await Category.create({ categoryName });
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCategory: async (req, res) => {
    const { id } = req.params;
    const { error } = createCategorySchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { categoryName } = req.body;

    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      category.categoryName = categoryName;
      await category.save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ message: "Category not found." });
      }

      await category.destroy();
      res.status(200).json({ message: "Category deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default categoryController;
