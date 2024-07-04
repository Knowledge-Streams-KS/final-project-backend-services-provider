import bookingRoutes from "./bookingRoutes";
import categoryRoutes from "./categoryRoutes";
import locationRoutes from "./locationRoutes";
import paymentRoutes from "./paymentRoutes";
import providerRoutes from "./providerRoutes";
import reviewRoutes from "./reviewRoutes";
import serviceRoutes from "./serviceRoutes";
import userRoutes from "./userRoutes";

const allRoutes = express.Router();

allRoutes.use(bookingRoutes);
allRoutes.use(categoryRoutes);
allRoutes.use(locationRoutes);
allRoutes.use(paymentRoutes);
allRoutes.use(providerRoutes);
allRoutes.use(reviewRoutes);
allRoutes.use(serviceRoutes);
allRoutes.use(userRoutes);

export default allRoutes;
