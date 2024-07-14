import User from "./userModel.js";
import Booking from "./bookingModel.js";
import Service from "./serviceModel.js";
import Provider from "./providerModel.js";
import Category from "./categoryModels.js";
import Location from "./locationModel.js";
import Payment from "./paymentModel.js";
import Review from "./reviewModel.js";

User.hasMany(Booking, { foreignKey: "userId" });
Booking.belongsTo(User, { foreignKey: "userId" });

Service.hasMany(Booking, { foreignKey: "serviceId" });
Booking.belongsTo(Service, { foreignKey: "serviceId" });

Category.hasMany(Service, { foreignKey: "categoryId" });
Service.belongsTo(Category, { foreignKey: "categoryId" });

Location.hasMany(Service, { foreignKey: "locationId" });
Service.belongsTo(Location, { foreignKey: "locationId" });

Provider.hasMany(Service, { foreignKey: "providerId" });
Service.belongsTo(Provider, { foreignKey: "providerId" });

Booking.hasMany(Payment, { foreignKey: "bookingId" });
Payment.belongsTo(Booking, { foreignKey: "bookingId" });

Service.hasMany(Review, { foreignKey: "serviceId" });
Review.belongsTo(Service, { foreignKey: "serviceId" });

User.hasMany(Review, { foreignKey: "userId" });
Review.belongsTo(User, { foreignKey: "userId" });

export {
  User,
  Category,
  Service,
  Booking,
  Provider,
  Review,
  Location,
  Payment,
};
