// src/controllers/cleaningServiceController.js

import CleaningService from "../models/cleaningServicesModel.js";

const getAllCleaningServices = async (req, res) => {
  try {
    const services = await CleaningService.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCleaningServiceById = async (req, res) => {
  try {
    const service = await CleaningService.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCleaningService = async (req, res) => {
  try {
    const service = await CleaningService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCleaningService = async (req, res) => {
  try {
    const service = await CleaningService.findByPk(req.params.id);
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

const deleteCleaningService = async (req, res) => {
  try {
    const service = await CleaningService.findByPk(req.params.id);
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
  getAllCleaningServices,
  getCleaningServiceById,
  createCleaningService,
  updateCleaningService,
  deleteCleaningService,
};
