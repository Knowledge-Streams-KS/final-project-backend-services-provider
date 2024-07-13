import Joi from "joi";

const createProviderSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Provider name is required.",
    "any.required": "Provider name is required",
  }),
  contact: Joi.string().required().messages({
    "string.empty": "Provider contact information is required.",
    "any.required": "Provider contact information is required",
  }),
});

export default { createProviderSchema };
