import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
const bookingModel = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  providerId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
  },
});

export default bookingModel;
