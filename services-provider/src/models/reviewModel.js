import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import User from "./userModel.js";
import Service from "./serviceModel.js";

const Review = sequelize.define(
  "Review",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Review.belongsTo(User, { foreignKey: "userId" });
Review.belongsTo(Service, { foreignKey: "serviceId" });

export default Review;
