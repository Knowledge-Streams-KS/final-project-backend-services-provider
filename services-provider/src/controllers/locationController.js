import Location from "../models/locationModel.js";
import locationSchema from "../middlewares/schemas/locationSchema.js";

const locationController = {
  createLocation: async (req, res) => {
    const { error } = locationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const { name } = req.body;

    try {
      const location = await Location.create({ name });
      res.status(201).json(location);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getLocation: async (req, res) => {
    try {
      const locations = await Location.findAll();
      res.status(200).json(locations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default locationController;
