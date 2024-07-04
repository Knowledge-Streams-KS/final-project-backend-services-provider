import reviewModel from "../models/reviewModel";

const createReview = async (req, res) => {
  const { userId, serviceId, rating, comment } = req.body;

  if (!userId || !serviceId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const review = await reviewModel.create({
      userId,
      serviceId,
      rating,
      comment,
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await reviewModel.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createReview, getReviews };
