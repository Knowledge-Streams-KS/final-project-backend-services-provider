// src/models/homeInspectionModel.js

import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const homeInspection = sequelize.define(
  "HomeInspection",
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
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
    },
    locationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "locations",
        key: "id",
      },
    },
    providerId: {
      type: DataTypes.INTEGER,
      references: {
        model: "providers",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default homeInspection;
