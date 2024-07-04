import categoryModel from "./categoryModels";
import serviceModel from "./serviceModel";
import userModel from "./userModel";
import bookingModel from "./bookingModel";
import providerModel from "./providerModel";
import reviewModel from "./reviewModel";
import locationModel from "./locationModel";
import paymentModel from "./paymentModel";

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
};
