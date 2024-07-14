import Review from "../models/reviewModel.js";
import reviewSchema from "../middlewares/schemas/reviewSchema.js";

const reviewController = {
  createReview: async (req, res) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ errors: error.details });
    }

    try {
      const { userId, serviceId, rating, comment } = req.body;
      const review = await Review.create({
        userId,
        serviceId,
        rating,
        comment,
      });
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getReviews: async (req, res) => {
    try {
      const reviews = await Review.findAll();
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default reviewController;
