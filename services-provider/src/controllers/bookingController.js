import bookingModel from "../models/bookingModel";

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

const getBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.findAll();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createBooking, getBookings };
