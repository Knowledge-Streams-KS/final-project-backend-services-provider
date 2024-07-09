import SolarService from "../models/solarServiceModel.js";

const getAllSolarServices = async (req, res) => {
  try {
    const services = await SolarService.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSolarServiceById = async (req, res) => {
  try {
    const service = await SolarService.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSolarService = async (req, res) => {
  try {
    const service = await SolarService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateSolarService = async (req, res) => {
  try {
    const service = await SolarService.findByPk(req.params.id);
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

const deleteSolarService = async (req, res) => {
  try {
    const service = await SolarService.findByPk(req.params.id);
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
  getAllSolarServices,
  getSolarServiceById,
  createSolarService,
  updateSolarService,
  deleteSolarService,
};
