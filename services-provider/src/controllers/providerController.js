import Provider from "../models/providerModel.js";
import createProviderSchema from "../middlewares/schemas/providerSchema.js";

const providerController = {
  createProvider: async (req, res) => {
    const { error } = createProviderSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    try {
      const { name, contact } = req.body;

      const existingProvider = await Provider.findOne({
        where: { name, contact },
      });
      if (existingProvider) {
        return res.status(400).json({ message: "Provider already exists" });
      }

      const provider = await Provider.create({ name, contact });
      res.status(201).json(provider);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getProviders: async (req, res) => {
    try {
      const providers = await Provider.findAll();
      res.status(200).json(providers);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default providerController;
