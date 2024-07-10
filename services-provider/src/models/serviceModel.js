import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import Category from "./categoryModels.js";

const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  serviceName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.UUID, // Ensure this matches the referenced model's data type
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default Service;
