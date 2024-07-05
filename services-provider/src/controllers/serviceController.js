import serviceModel from "../models/serviceModel.js";

const createService = async (req, res) => {
  const { serviceName, categoryId, description, price } = req.body;

  if (!serviceName || !categoryId || !description || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const service = await serviceModel.create({
      serviceName,
      categoryId,
      description,
      price,
    });
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getServices = async (req, res) => {
  try {
    const services = await serviceModel.findAll();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateService = async (req, res) => {
  const { id } = req.params;
  const { serviceName, categoryId, description, price } = req.body;

  if (!serviceName || !categoryId || !description || !price) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    service.serviceName = serviceName;
    service.categoryId = categoryId;
    service.description = description;
    service.price = price;
    await service.save();
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;

  try {
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    await service.destroy();
    res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createService, getServices, updateService, deleteService };
