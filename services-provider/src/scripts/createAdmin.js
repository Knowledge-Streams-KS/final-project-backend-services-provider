import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import dotenv from "dotenv";
import sequelize from "../db/config.js";

dotenv.config();

console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const provider = async () => {
  const providerData = {
    firstName: "Waqas",
    lastName: "Raza",
    email: "support@provider.com",
    password: bcrypt.hashSync("1122334455", 10), // securely hash the password
    role: "provider",
  };

  try {
    await sequelize.authenticate(); // Ensure the connection is established
    console.log("Database connected successfully.");

    await User.create(providerData);
    console.log("provider user created successfully");
  } catch (error) {
    console.error("Error creating provider user:", error);
  }
};

provider();
