import Joi from "joi";

const locationSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Name is required.",
  }),
});

export default locationSchema;
