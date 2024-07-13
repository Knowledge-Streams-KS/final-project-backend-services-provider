import Joi from "joi";

const reviewSchema = {
  reviewSchema: Joi.object({
    userId: Joi.string().required().messages({
      "string.empty": "User ID is required.",
    }),
    serviceId: Joi.string().required().messages({
      "string.empty": "Service ID is required.",
    }),
    rating: Joi.number().integer().min(1).max(5).required().messages({
      "number.base": "Rating must be a number.",
      "number.integer": "Rating must be an integer.",
      "number.min": "Rating must be at least 1.",
      "number.max": "Rating must be at most 5.",
      "any.required": "Rating is required.",
    }),
    comment: Joi.string().required().messages({
      "string.empty": "Comment is required.",
    }),
  }),
};

export default reviewSchema;
