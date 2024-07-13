import Joi from "joi";

const paymentSchema = {
  paymentSchema: Joi.object({
    bookingId: Joi.string().required().messages({
      "string.empty": "Booking ID is required.",
    }),
    amount: Joi.number().min(0).required().messages({
      "number.base": "Amount must be a number.",
      "number.min": "Amount must be greater than or equal to 0.",
    }),
    method: Joi.string()
      .valid("credit_card", "debit_card", "paypal")
      .required()
      .messages({
        "any.only":
          "Invalid payment method. Must be 'credit_card', 'debit_card', or 'paypal'.",
      }),
    status: Joi.string()
      .valid("pending", "completed", "failed")
      .required()
      .messages({
        "any.only":
          "Invalid payment status. Must be 'pending', 'completed', or 'failed'.",
      }),
  }),
};

export default paymentSchema;
