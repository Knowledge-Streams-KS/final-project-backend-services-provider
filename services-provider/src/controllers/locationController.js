import locationModel from "../models/locationModel.js";

const createLocation = async (req, res) => {
  const { city, area, coordinates } = req.body;

  if (!city || !area || !coordinates) {
    return res.status(400).json({ message: "Al fields are required" });
  }

  try {
    const location = await locationModel.create({ city, area, coordinates });
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLocation = async (req, res) => {
  try {
    const location = await locationModel.findAll();
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

export { createLocation, getLocation };
