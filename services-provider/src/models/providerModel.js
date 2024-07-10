// src/models/providerModel.js
import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Provider = sequelize.define("Provider", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Provider;
