import HomeInspection from "../models/homeInspectionModel.js";

const getAllHomeInspections = async (req, res) => {
  try {
    const services = await HomeInspection.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHomeInspectionById = async (req, res) => {
  try {
    const service = await HomeInspection.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHomeInspection = async (req, res) => {
  try {
    const service = await HomeInspection.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHomeInspection = async (req, res) => {
  try {
    const service = await HomeInspection.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHomeInspection = async (req, res) => {
  try {
    const service = await HomeInspection.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      res.status(200).json({ message: "Service deleted" });
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllHomeInspections,
  getHomeInspectionById,
  createHomeInspection,
  updateHomeInspection,
  deleteHomeInspection,
};
