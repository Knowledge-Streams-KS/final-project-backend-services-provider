import bookingModel from "../models/bookingModel.js";
import categoryModel from "../models/categoryModels.js";
import locationModel from "../models/locationModel.js";
import paymentModel from "../models/paymentModel.js";
import providerModel from "../models/providerModel.js";
import reviewModel from "../models/reviewModel.js";
import serviceModel from "../models/serviceModel.js";
import userModel from "../models/userModel.js";

const syncDB = async () => {};
await bookingModel.sync({ alter: true, force: false });
await categoryModel.sync({ alter: true, force: false });
await locationModel.sync({ alter: true, force: false });
await paymentModel.sync({ alter: true, force: false });
await providerModel.sync({ alter: true, force: false });
await reviewModel.sync({ alter: true, force: false });
await serviceModel.sync({ alter: true, force: false });
await userModel.sync({ alter: true, force: false });

export default syncDB;
