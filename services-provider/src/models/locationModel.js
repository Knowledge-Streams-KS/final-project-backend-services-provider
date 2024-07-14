import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";

const Location = sequelize.define("Location", {
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

export default Location;
