import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";
import bookingSchema from "../middlewares/schemas/bookingSchema.js";

const bookingController = {
  createBooking: async (req, res) => {
    const { error } = bookingSchema.bookingSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { userId, serviceId, date, time } = req.body;

    try {
      // Check if user exists
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      // Check if service exists
      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      // Create booking
      const booking = await Booking.create({ userId, serviceId, date, time });

      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  rescheduleBooking: async (req, res) => {
    const { error } = bookingSchema.rescheduleSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const { id } = req.params;
    const { date, time } = req.body;

    try {
      const booking = await Booking.findByPk(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      booking.date = date;
      booking.time = time;
      await booking.save();

      res.status(200).json(booking);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const bookings = await Booking.findAll({
        include: [
          { model: User, attributes: ["id", "firstName", "lastName", "email"] },
          {
            model: Service,
            attributes: ["id", "serviceName", "description", "price"],
          },
        ],
      });
      res.status(200).json(bookings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default bookingController;
