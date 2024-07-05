import bookingModel from "../models/bookingModel.js";

//create booking
const createBooking = async (req, res) => {
  const { userId, serviceId, providerId, date, time } = req.body;

  if (!userId || !serviceId || !providerId || !date || !time) {
    return res.status(400).json({ message: "All fields are require" });
  }

  try {
    const booking = await bookingModel.create({
      userId,
      serviceId,
      providerId,
      date,
      time,
    });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

//get booking
const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const confirmBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const booking = await bookingModel.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    booking.status = "confirmed";
    await booking.save();
    res.status(200).json({ message: "Booking confirmed." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//cancel booking

const cancelBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await bookingModel.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }
    booking.status = "canceled";
    await booking.save();
    res.status(200).json({ message: "Booking canceled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Reschedule Booking
const rescheduleBooking = async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;
  if (!date || !time) {
    return res.status(400).json({ message: "Date and time are required" });
  }
  try {
    const booking = await bookingModel.findByPk(id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.date = date;
    booking.time = time;
    await booking.save();
    res.status(200).json({ message: "Booking rescheduled." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createBooking,
  getBookings,
  confirmBooking,
  cancelBooking,
  rescheduleBooking,
};
