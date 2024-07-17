import { DataTypes } from "sequelize";
import sequelize from "../db/config.js";
import Category from "./categoryModels.js";
import Location from "./locationModel.js";
import Provider from "./providerModel.js";

const Service = sequelize.define(
  "Service",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    serviceName: {
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
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
    locationId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Location,
        key: "id",
      },
    },
    providerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Provider,
        key: "id",
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Service.belongsTo(Category, { foreignKey: "categoryId" });
Service.belongsTo(Location, { foreignKey: "locationId" });
Service.belongsTo(Provider, { foreignKey: "providerId" });

export default Service;
