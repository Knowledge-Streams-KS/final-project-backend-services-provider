import Service from "../models/serviceModel.js";
import Category from "../models/categoryModels.js";
import Location from "../models/locationModel.js";
import Provider from "../models/providerModel.js";
import serviceSchema from "../middlewares/schemas/serviceSchema.js";

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
      // Check if category exists
      const category = await Category.findByPk(categoryId);
      if (!category) {
        return res.status(400).json({ message: "Invalid category" });
      }

      // Check if location exists
      const location = await Location.findByPk(locationId);
      if (!location) {
        return res.status(400).json({ message: "Invalid location" });
      }

      // Check if provider exists
      const provider = await Provider.findByPk(providerId);
      if (!provider) {
        return res.status(400).json({ message: "Invalid provider" });
      }

      // Create service
      const service = await Service.create({
        serviceName,
        description,
        price,
        categoryId,
        locationId,
        providerId,
        userId: req.user.id,
      });

      res.status(201).json(service);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getServicesByCategory: async (req, res) => {
    const { category } = req.params;
    try {
      const services = await Service.findAll({
        where: { categoryId: category },
        include: [
          {
            model: Category,
            attributes: ["categoryName"],
          },
        ],
      });
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  getServicesByName: async (req, res) => {
    const { name } = req.params;

    try {
      const services = await Service.findAll({ where: { name } });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getServicesByLocation: async (req, res) => {
    const { location } = req.params;

    try {
      const services = await Service.findAll({
        where: { locationId: location },
      });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getServicesByProvider: async (req, res) => {
    const { provider } = req.params;

    try {
      const services = await Service.findAll({
        where: { providerId: provider },
      });
      res.status(200).json(services);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllServices: async (req, res) => {
    try {
      const services = await Service.findAll({
        include: [
          {
            model: Category,
            attributes: ["categoryName"],
          },
        ],
      });
      res.status(200).json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default serviceController;
