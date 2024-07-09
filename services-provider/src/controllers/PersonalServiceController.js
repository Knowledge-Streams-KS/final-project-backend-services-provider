import PersonalService from "../models/personalServiceModel.js";

const getAllPersonalServices = async (req, res) => {
  try {
    const services = await PersonalService.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPersonalServiceById = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
    if (service) {
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPersonalService = async (req, res) => {
  try {
    const service = await PersonalService.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePersonalService = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
    if (service) {
      await service.update(req.body);
      res.status(200).json(service);
    } else {
      res.status(404).json({ message: "Service not found" });
    }
  } catch (error) {
    res.status500().json({ error: error.message });
  }
};

const deletePersonalService = async (req, res) => {
  try {
    const service = await PersonalService.findByPk(req.params.id);
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
  getAllPersonalServices,
  getPersonalServiceById,
  createPersonalService,
  updatePersonalService,
  deletePersonalService,
};
