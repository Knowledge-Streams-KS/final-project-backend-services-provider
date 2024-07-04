import paymentModel from "../models/paymentModel.js";

const createPayment = async (req, res) => {
  const { bookingId, amount, method, status } = req.body;

  if (!bookingId || !amount || !method || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const payment = await paymentModel.create({
      bookingId,
      amount,
      method,
      status,
    });
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPayment = async (req, res) => {
  try {
    const payments = await paymentModel.findAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPayment, getPayment };
