import PersonalService from "../models/personalServiceModel.js";
import logger from "../utils/logger.js";

const getAllPersonalServices = async (req, res) => {
  try {
    const services = await PersonalService.findAll();
    logger.info("Fetched all personal services");
    res.status(200).json(services);
  } catch (error) {
    logger.error("Error fetching personal services:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const getPersonalServiceById = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
    if (service) {
      logger.info(`Fetched personal service with id ${req.params.id}`);
      res.status(200).json(service);
    } else {
      logger.warn(`Personal service with id ${req.params.id} not found`);
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    logger.error("Error fetching personal service by id:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const createPersonalService = async (req, res) => {
  try {
    const service = await PersonalService.create(req.body);
    logger.info("Created new personal service", service);
    res.status(201).json(service);
  } catch (error) {
    logger.error("Error creating personal service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const updatePersonalService = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      logger.info(`Updated personal service with id ${req.params.id}`);
      res.status(200).json(service);
    } else {
      logger.warn(`Personal service with id ${req.params.id} not found`);
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    logger.error("Error updating personal service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const deletePersonalService = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
    if (service) {
      await service.destroy();
      logger.info(`Deleted personal service with id ${req.params.id}`);
      res.status(200).json({ message: "Service deleted" });
    } else {
      logger.warn(`Personal service with id ${req.params.id} not found`);
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    logger.error("Error deleting personal service:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export default {
  getAllPersonalServices,
  getPersonalServiceById,
  createPersonalService,
  updatePersonalService,
  deletePersonalService,
};
