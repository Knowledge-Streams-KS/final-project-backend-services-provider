import categoryModel from "./categoryModels";
import serviceModel from "./serviceModel";
import userModel from "./userModel";
import bookingModel from "./bookingModel";
import providerModel from "./providerModel";
import reviewModel from "./reviewModel";
import locationModel from "./locationModel";
import paymentModel from "./paymentModel";
const homeServiceModel = require("./homeServiceModel");
const cleaningServiceModel = require("./cleaningServiceModel");
const personalServiceModel = require("./personalServiceModel");
const solarServiceModel = require("./solarServiceModel");
const homeInspectionModel = require("./homeInspectionModel");

categoryModel.hasMany(serviceModel, { foreignKey: "categoryId" });
serviceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

userModel.hasMany(bookingModel, { foreignKey: "userId" });
bookingModel.belongsTo(userModel, { foreignKey: "userId" });

serviceModel.hasMany(bookingModel, { foreignKey: "serviceId" });
bookingModel.belongsTo((serviceModel, { foreignKey: "serviceId" }));

providerModel.hasMany(bookingModel, { foreignKey: " providerId " });
bookingModel.belongsTo(providerModel, { foreignKey: "providerId" });

serviceModel.hasMany(reviewModel, { foreignKey: "serviceId" });
reviewModel.belongsTo(serviceModel, { foreignKey: "serviceId" });

userModel.hasMany(reviewModel, { foreignKey: "userId" });
reviewModel.belongsTo(userModel, { foreignKey: "userId" });

locationModel.hasMany(serviceModel, { foreignKey: "locationId" });
serviceModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(paymentModel, { foreignKey: "bookingId" });
paymentModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

categoryModel.hasMany(homeServiceModel, { foreignKey: "categoryId" });
homeServiceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

userModel.hasMany(homeServiceModel, { foreignKey: "userId" });
homeServiceModel.belongsTo(userModel, { foreignKey: "userId" });

providerModel.hasMany(homeServiceModel, { foreignKey: "providerId" });
homeServiceModel.belongsTo(providerModel, { foreignKey: "providerId" });

locationModel.hasMany(homeServiceModel, { foreignKey: "locationId" });
homeServiceModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(homeServiceModel, { foreignKey: "bookingId" });
homeServiceModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

categoryModel.hasMany(cleaningServiceModel, { foreignKey: "categoryId" });
cleaningServiceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

userModel.hasMany(cleaningServiceModel, { foreignKey: "userId" });
cleaningServiceModel.belongsTo(userModel, { foreignKey: "userId" });

providerModel.hasMany(cleaningServiceModel, { foreignKey: "providerId" });
cleaningServiceModel.belongsTo(providerModel, { foreignKey: "providerId" });

locationModel.hasMany(cleaningServiceModel, { foreignKey: "locationId" });
cleaningServiceModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(cleaningServiceModel, { foreignKey: "bookingId" });
cleaningServiceModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

categoryModel.hasMany(personalServiceModel, { foreignKey: "categoryId" });
personalServiceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

userModel.hasMany(personalServiceModel, { foreignKey: "userId" });
personalServiceModel.belongsTo(userModel, { foreignKey: "userId" });

providerModel.hasMany(personalServiceModel, { foreignKey: "providerId" });
personalServiceModel.belongsTo(providerModel, { foreignKey: "providerId" });

locationModel.hasMany(personalServiceModel, { foreignKey: "locationId" });
personalServiceModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(personalServiceModel, { foreignKey: "bookingId" });
personalServiceModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

categoryModel.hasMany(solarServiceModel, { foreignKey: "categoryId" });
solarServiceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

userModel.hasMany(solarServiceModel, { foreignKey: "userId" });
solarServiceModel.belongsTo(userModel, { foreignKey: "userId" });

providerModel.hasMany(solarServiceModel, { foreignKey: "providerId" });
solarServiceModel.belongsTo(providerModel, { foreignKey: "providerId" });

locationModel.hasMany(solarServiceModel, { foreignKey: "locationId" });
solarServiceModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(solarServiceModel, { foreignKey: "bookingId" });
solarServiceModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

categoryModel.hasMany(homeInspectionModel, { foreignKey: "categoryId" });
homeInspectionModel.belongsTo(Category, { foreignKey: "categoryId" });

userModel.hasMany(homeInspectionModel, { foreignKey: "userId" });
homeInspectionModel.belongsTo(userModel, { foreignKey: "userId" });

providerModel.hasMany(homeInspectionModel, { foreignKey: "providerId" });
homeInspectionModel.belongsTo(providerModel, { foreignKey: "providerId" });

locationModel.hasMany(homeInspectionModel, { foreignKey: "locationId" });
homeInspectionModel.belongsTo(locationModel, { foreignKey: "locationId" });

bookingModel.hasMany(homeInspectionModel, { foreignKey: "bookingId" });
homeInspectionModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

export {
  sequelize,
  userModel,
  categoryModel,
  serviceModel,
  bookingModel,
  providerModel,
  reviewModel,
  locationModel,
  paymentModel,
  homeServiceModel,
  homeInspectionModel,
  personalServiceModel,
  cleaningServiceModel,
  solarServiceModel,
};
