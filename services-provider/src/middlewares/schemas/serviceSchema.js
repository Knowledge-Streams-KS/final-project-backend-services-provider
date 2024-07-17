import Joi from "joi";

const createServiceSchema = Joi.object({
  serviceName: Joi.string().required().messages({
    "string.empty": "Service name is required",
    "any.required": "Service name is required",
  }),
  description: Joi.string().required().messages({
    "string.empty": "Description is required",
    "any.required": "Description is required",
  }),
  price: Joi.number().required().messages({
    "number.base": "Price must be a number",
    "any.required": "Price is required",
  }),
  categoryId: Joi.string().uuid().required().messages({
    "string.guid": "Category ID must be a valid UUID",
    "any.required": "Category ID is required",
  }),
  locationId: Joi.string().uuid().required().messages({
    "string.guid": "Location ID must be a valid UUID",
    "any.required": "Location ID is required",
  }),
  providerId: Joi.string().uuid().required().messages({
    "string.guid": "Provider ID must be a valid UUID",
    "any.required": "Provider ID is required",
  }),
  image: Joi.any(),
});

export default { createServiceSchema };
