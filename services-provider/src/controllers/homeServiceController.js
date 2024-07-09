// src/controllers/homeServiceController.js

import HomeService from "../models/homeServiceModel.js";

const getAllHomeServices = async (req, res) => {
  try {
    const services = await HomeService.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHomeServiceById = async (req, res) => {
  try {
    const service = await HomeService.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createHomeService = async (req, res) => {
  try {
    const service = await HomeService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateHomeService = async (req, res) => {
  try {
    const service = await HomeService.findByPk(req.params.id);
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

const deleteHomeService = async (req, res) => {
  try {
    const service = await HomeService.findByPk(req.params.id);
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
  getAllHomeServices,
  getHomeServiceById,
  createHomeService,
  updateHomeService,
  deleteHomeService,
};
