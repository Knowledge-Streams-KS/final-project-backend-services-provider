import Service from "../models/serviceModel.js";
import Category from "../models/categoryModels.js";
import Location from "../models/locationModel.js";
import Provider from "../models/providerModel.js";
import serviceSchema from "../middlewares/schemas/serviceSchema.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const serviceController = {
  createService: async (req, res) => {
    const { error } = serviceSchema.createServiceSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const {
      serviceName,
      description,
      price,
      categoryId,
      locationId,
      providerId,
    } = req.body;

    try {
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Invalid category" });
      }

      const location = await Location.findByPk(locationId);
      if (!location) {
        return res.status(400).json({ message: "Invalid location" });
      }

      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        return res.status(400).json({ message: "Invalid provider" });
      }

      const service = await Service.create({
        serviceName,
        description,
        price,
        categoryId,
        locationId,
        providerId,
        userId: req.user.id,
        imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
      });

      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getServicesByCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const categoryData = await Category.findOne({
        where: { categoryName: category },
      });
      if (!categoryData) {
        return res.status(404).json({ message: "Category not found" });
      }
      const services = await Service.findAll({
        where: { categoryId: categoryData.id },
        include: [{ model: Category, attributes: ["categoryName"] }],
      });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await Service.findAll({
        include: [{ model: Category, attributes: ["categoryName"] }],
      });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getServiceById: async (req, res) => {
    const { id } = req.params;
    try {
      const service = await Service.findByPk(id, {
        include: [
          { model: Provider, attributes: ["name"] },
          { model: Category, attributes: ["categoryName"] },
          { model: Location, attributes: ["name"] },
        ],
      });
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.status(200).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export { upload, serviceController };
