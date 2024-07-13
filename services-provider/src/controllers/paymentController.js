import paymentModel from "../models/paymentModel.js";
import paymentSchema from "../middlewares/schemas/paymentSchema.js";

const paymentController = {
  createPayment: async (req, res) => {
    const { error } = paymentSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    const { bookingId, amount, method, status } = req.body;

    try {
      const payment = await paymentModel.create({
        bookingId,
        amount,
        method,
        status,
      });
      res.status(201).json(payment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getPayments: async (req, res) => {
    try {
      const payments = await paymentModel.findAll();
      res.status(200).json(payments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default paymentController;
