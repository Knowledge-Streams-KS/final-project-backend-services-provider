import bookingModel from "../models/bookingModel.js";
import categoryModel from "../models/categoryModels.js";
import locationModel from "../models/locationModel.js";
import paymentModel from "../models/paymentModel.js";
import providerModel from "../models/providerModel.js";
import reviewModel from "../models/reviewModel.js";
import serviceModel from "../models/serviceModel.js";
import userModel from "../models/userModel.js";
import "../models/associations.js";

const syncDB = async () => {
  try {
    // Sync tables with no foreign key references first
    await userModel.sync({ alter: true, force: false });
    await categoryModel.sync({ alter: true, force: false });
    await locationModel.sync({ alter: true, force: false });
    await providerModel.sync({ alter: true, force: false });

    // Sync tables with foreign key references next
    await serviceModel.sync({ alter: true, force: false });
    await bookingModel.sync({ alter: true, force: false });
    await paymentModel.sync({ alter: true, force: false });
    await reviewModel.sync({ alter: true, force: false });

    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to synchronize the models:", error);
  }
};

export default syncDB;
