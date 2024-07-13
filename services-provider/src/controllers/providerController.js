import providerModel from "../models/providerModel.js";
import providerSchema from "../middlewares/schemas/providerSchema.js";

const providerController = {
  createProvider: async (req, res) => {
    const { error } = providerSchema.createProviderSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    try {
      const { name, contact } = req.body;

      // Check if provider already exists
      const existingProvider = await providerModel.findOne({
        where: { name, contact },
      });
      if (existingProvider) {
        return res.status(400).json({ message: "Provider already exists" });
      }

      // Create new provider
      const provider = await providerModel.create({ name, contact });
      res.status(201).json(provider);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProviders: async (req, res) => {
    try {
      const providers = await providerModel.findAll();
      res.status(200).json(providers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default providerController;
