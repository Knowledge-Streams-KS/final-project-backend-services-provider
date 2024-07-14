import Joi from "joi";

const bookingSchema = {
  bookingSchema: Joi.object({
    userId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.guid": "Invalid user ID",
        "any.required": "User ID is required",
      }),
    serviceId: Joi.string()
      .guid({ version: ["uuidv4"] })
      .required()
      .messages({
        "string.guid": "Invalid service ID",
        "any.required": "Service ID is required",
      }),
    date: Joi.date().required().messages({
      "any.required": "Date is required",
    }),
    time: Joi.string().required().messages({
      "any.required": "Time is required",
    }),
    serviceAddress: Joi.string().required().messages({
      "any.required": "Service Address is required",
    }),
    address: Joi.string().required().messages({
      "any.required": "Profile Address is required",
    }),
    phoneNumber: Joi.string().required().messages({
      "any.required": "Phone Number is required",
    }),
    name: Joi.string().required().messages({
      "any.required": "Name is required",
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
