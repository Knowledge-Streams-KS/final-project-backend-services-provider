import userModel from "./userModel.js";
import bookingModel from "./bookingModel.js";
import serviceModel from "./serviceModel.js";
import providerModel from "./providerModel.js";
import categoryModel from "./categoryModels.js";
import locationModel from "./locationModel.js";
import paymentModel from "./paymentModel.js";
import PersonalService from "./personalServiceModel.js";
import CleaningServiceModel from "./cleaningServicesModel.js";
import homeInspection from "./homeInspectionModel.js";
import HomeService from "./homeServiceModel.js";
import SolarService from "./solarServiceModel.js";
import reviewModel from "./reviewModel.js";

// Define associations in the correct order

// Category and Service
categoryModel.hasMany(serviceModel, { foreignKey: "categoryId" });
serviceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

// Location and Service
locationModel.hasMany(serviceModel, { foreignKey: "locationId" });
serviceModel.belongsTo(locationModel, { foreignKey: "locationId" });

// User and Booking
userModel.hasMany(bookingModel, { foreignKey: "userId" });
bookingModel.belongsTo(userModel, { foreignKey: "userId" });

// Service and Booking
serviceModel.hasMany(bookingModel, { foreignKey: "serviceId" });
bookingModel.belongsTo(serviceModel, { foreignKey: "serviceId" });

// Provider and Booking
providerModel.hasMany(bookingModel, { foreignKey: "providerId" });
bookingModel.belongsTo(providerModel, { foreignKey: "providerId" });

// Booking and Payment
bookingModel.hasMany(paymentModel, { foreignKey: "bookingId" });
paymentModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

// Service and Review
serviceModel.hasMany(reviewModel, { foreignKey: "serviceId" });
reviewModel.belongsTo(serviceModel, { foreignKey: "serviceId" });

// User and Review
userModel.hasMany(reviewModel, { foreignKey: "userId" });
reviewModel.belongsTo(userModel, { foreignKey: "userId" });

// HomeService associations
categoryModel.hasMany(HomeService, { foreignKey: "categoryId" });
HomeService.belongsTo(categoryModel, { foreignKey: "categoryId" });

locationModel.hasMany(HomeService, { foreignKey: "locationId" });
HomeService.belongsTo(locationModel, { foreignKey: "locationId" });

providerModel.hasMany(HomeService, { foreignKey: "providerId" });
HomeService.belongsTo(providerModel, { foreignKey: "providerId" });

bookingModel.hasMany(HomeService, { foreignKey: "bookingId" });
HomeService.belongsTo(bookingModel, { foreignKey: "bookingId" });

// CleaningService associations
categoryModel.hasMany(CleaningServiceModel, { foreignKey: "categoryId" });
CleaningServiceModel.belongsTo(categoryModel, { foreignKey: "categoryId" });

locationModel.hasMany(CleaningServiceModel, { foreignKey: "locationId" });
CleaningServiceModel.belongsTo(locationModel, { foreignKey: "locationId" });

providerModel.hasMany(CleaningServiceModel, { foreignKey: "providerId" });
CleaningServiceModel.belongsTo(providerModel, { foreignKey: "providerId" });

bookingModel.hasMany(CleaningServiceModel, { foreignKey: "bookingId" });
CleaningServiceModel.belongsTo(bookingModel, { foreignKey: "bookingId" });

// PersonalService associations
categoryModel.hasMany(PersonalService, { foreignKey: "categoryId" });
PersonalService.belongsTo(categoryModel, { foreignKey: "categoryId" });

locationModel.hasMany(PersonalService, { foreignKey: "locationId" });
PersonalService.belongsTo(locationModel, { foreignKey: "locationId" });

providerModel.hasMany(PersonalService, { foreignKey: "providerId" });
PersonalService.belongsTo(providerModel, { foreignKey: "providerId" });

bookingModel.hasMany(PersonalService, { foreignKey: "bookingId" });
PersonalService.belongsTo(bookingModel, { foreignKey: "bookingId" });

// SolarService associations
categoryModel.hasMany(SolarService, { foreignKey: "categoryId" });
SolarService.belongsTo(categoryModel, { foreignKey: "categoryId" });

locationModel.hasMany(SolarService, { foreignKey: "locationId" });
SolarService.belongsTo(locationModel, { foreignKey: "locationId" });

providerModel.hasMany(SolarService, { foreignKey: "providerId" });
SolarService.belongsTo(providerModel, { foreignKey: "providerId" });

bookingModel.hasMany(SolarService, { foreignKey: "bookingId" });
SolarService.belongsTo(bookingModel, { foreignKey: "bookingId" });

// HomeInspection associations
categoryModel.hasMany(homeInspection, { foreignKey: "categoryId" });
homeInspection.belongsTo(categoryModel, { foreignKey: "categoryId" });

locationModel.hasMany(homeInspection, { foreignKey: "locationId" });
homeInspection.belongsTo(locationModel, { foreignKey: "locationId" });

providerModel.hasMany(homeInspection, { foreignKey: "providerId" });
homeInspection.belongsTo(providerModel, { foreignKey: "providerId" });

bookingModel.hasMany(homeInspection, { foreignKey: "bookingId" });
homeInspection.belongsTo(bookingModel, { foreignKey: "bookingId" });

export {
  userModel,
  categoryModel,
  serviceModel,
  bookingModel,
  providerModel,
  reviewModel,
  locationModel,
  paymentModel,
  HomeService,
  homeInspection,
  PersonalService,
  CleaningServiceModel,
  SolarService,
};
