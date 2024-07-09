import serviceModel from "../models/serviceModel.js";

// Get all services
const getServices = async (req, res) => {
  try {
    const services = await serviceModel.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get service by ID
const getServiceById = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await serviceModel.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
const createService = async (req, res) => {
  const { name, description, price } = req.body;
  try {
    const newService = await serviceModel.create({ name, description, price });
    res.status(201).json(newService);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a service
const updateService = async (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  try {
    const service = await serviceModel.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    service.name = name;
    service.description = description;
    service.price = price;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a service
const deleteService = async (req, res) => {
  const { id } = req.params;
  try {
    const service = await serviceModel.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
