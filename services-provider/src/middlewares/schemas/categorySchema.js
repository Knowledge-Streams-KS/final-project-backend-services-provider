import Joi from "joi";

const createCategorySchema = Joi.object({
  categoryName: Joi.string().required().messages({
    "string.empty": "Category name is required.",
    "any.required": "Category name is required",
  }),
});

export default createCategorySchema;
