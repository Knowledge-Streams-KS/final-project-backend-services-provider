import serviceModel from "../models/serviceModel";

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

export { createService, getServices };
