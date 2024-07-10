// src/models/categoryModel.js
import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.UUID, // Ensure consistent data type
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Category;
