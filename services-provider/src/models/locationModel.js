import { DataType, DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const locationModel = sequelize.define("Location", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.GEOGRAPHY("POINT"),
    allowNull: false,
  },
});

export default locationModel;
