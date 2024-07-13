import Joi from "joi";

const bookingSchema = {
  bookingSchema: Joi.object({
    userId: Joi.string().uuid().required().messages({
      "string.uuid": "Invalid user ID",
      "any.required": "User ID is required",
    }),
    serviceId: Joi.string().uuid().required().messages({
      "string.uuid": "Invalid service ID",
      "any.required": "Service ID is required",
    }),
    date: Joi.date().required().messages({
      "any.required": "Date is required",
    }),
    time: Joi.string().required().messages({
      "any.required": "Time is required",
    }),
  }),

  rescheduleSchema: Joi.object({
    date: Joi.date().required().messages({
      "any.required": "Date is required",
    }),
    time: Joi.string().required().messages({
      "any.required": "Time is required",
    }),
  }),
};

export default bookingSchema;
