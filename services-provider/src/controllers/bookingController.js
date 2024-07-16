// bookingController.js

import Booking from "../models/bookingModel.js";
import User from "../models/userModel.js";
import Service from "../models/serviceModel.js";
import Provider from "../models/providerModel.js";
import Location from "../models/locationModel.js";
import Category from "../models/categoryModels.js";
import bookingSchema from "../middlewares/schemas/bookingSchema.js";

const bookingController = {
  createBooking: async (req, res) => {
    const { error } = bookingSchema.bookingSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((err) => err.message) });
    }

    const {
      userId,
      serviceId,
      date,
      time,
      serviceAddress,
      address,
      phoneNumber,
      name,
    } = req.body;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ message: "Invalid user ID" });
      }

      const service = await Service.findByPk(serviceId);
      if (!service) {
        return res.status(400).json({ message: "Invalid service ID" });
      }

      const booking = await Booking.create({
        userId,
        serviceId,
        date,
        time,
        serviceAddress,
        address,
        phoneNumber,
        name,
      });

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
            include: [
              { model: Provider, attributes: ["name"] },
              { model: Category, attributes: ["categoryName"] },
              { model: Location, attributes: ["name"] },
            ],
          },
        ],
      });
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching bookings:", error); // Log the error
      res.status(500).json({ error: error.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Fetching booking with ID: ${id}`); // Log the booking ID

      const booking = await Booking.findByPk(id, {
        include: [
          { model: User, attributes: ["id", "firstName", "lastName", "email"] },
          {
            model: Service,
            attributes: ["id", "serviceName", "description", "price"],
            include: [
              {
                model: Provider,
                attributes: ["name"],
              },
              {
                model: Category,
                attributes: ["categoryName"],
              },
              {
                model: Location,
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      if (!booking) {
        console.log(`Booking with ID: ${id} not found`); // Log if booking is not found
        return res.status(404).json({ message: "Booking not found" });
      }

      console.log("Booking found: ", booking); // Log booking details
      res.status(200).json(booking);
    } catch (error) {
      console.error("Error fetching booking:", error); // Log the error
      res.status(500).json({ error: error.message });
    }
  },

  getUserBookings: async (req, res) => {
    try {
      const userId = req.user.id;
      console.log("User ID:", userId); // Log the user ID

      const bookings = await Booking.findAll({
        where: { userId },
        include: [
          { model: User, attributes: ["id", "firstName", "lastName", "email"] },
          {
            model: Service,
            attributes: ["id", "serviceName", "description", "price"],
            include: [
              { model: Provider, attributes: ["name"] },
              { model: Category, attributes: ["categoryName"] },
              { model: Location, attributes: ["name"] },
            ],
          },
        ],
      });
      res.status(200).json(bookings);
    } catch (error) {
      console.error("Error fetching user bookings:", error);
      res.status(500).json({ error: error.message });
    }
  },
};

export default bookingController;
