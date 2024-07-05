import providerModel from "../models/providerModel.js";

const createProvider = async (req, res) => {
  const { name, expertise, contact } = req.body;

  if (!name || !expertise || !contact) {
    return res.status(400).json({ message: "All fields are require" });
  }

  try {
    const provider = await providerModel.create({ name, expertise, contact });
    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProviders = async (rq, res) => {
  try {
    const providers = await providerModel.findAll();
    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createProvider, getProviders };
