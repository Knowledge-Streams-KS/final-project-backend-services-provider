// src/models/cleaningServiceModel.js

import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const CleaningServiceModel = sequelize.define(
  "CleaningService",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default CleaningServiceModel;
