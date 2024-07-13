import Joi from "joi";

const userSchema = {
  registerSchema: Joi.object({
    firstName: Joi.string().trim().required().messages({
      "string.empty": "First name cannot be empty",
      "any.required": "First name is required",
    }),
    lastName: Joi.string().trim().required().messages({
      "string.empty": "Last name cannot be empty",
      "any.required": "Last name is required",
    }),
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please include a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
    phoneNumber: Joi.string().trim().min(6).required().messages({
      "string.min": "Phone number must be at least 6 characters",
      "string.empty": "Phone number cannot be empty",
      "any.required": "Phone number is required",
    }),
    address: Joi.string().trim().min(6).required().messages({
      "string.min": "Address must be at least 6 characters",
      "string.empty": "Address cannot be empty",
      "any.required": "Address is required",
    }),
    role: Joi.string()
      .trim()
      .valid("customer", "provider")
      .required()
      .messages({
        "any.only": "Role must be either 'customer' or 'provider'",
        "string.empty": "Role cannot be empty",
        "any.required": "Role is required",
      }),
  }),

  loginSchema: Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please include a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
    password: Joi.string().trim().required().messages({
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
  }),

  forgotPasswordSchema: Joi.object({
    email: Joi.string().trim().email().required().messages({
      "string.email": "Please include a valid email",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is required",
    }),
  }),

  resetPasswordSchema: Joi.object({
    password: Joi.string().trim().min(6).required().messages({
      "string.min": "Password must be at least 6 characters",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is required",
    }),
  }),
};

export default userSchema;
