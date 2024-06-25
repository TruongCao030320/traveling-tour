import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
export const createReview = async (req, res) => {
  const tourId = req.params.tourId;
  try {
    const newReview = new Review({
      ...req.body,
    });
    const savedReview = await newReview.save();
    await Tour.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });
    return res.status(201).json({
      success: true,
      message: "Review is submitted !",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Can not submit review !",
    });
  }
};
export const getReviews = async (req, res) => {
  const page = parseInt(req.query.page);
  try {
    const reviews = await Review.find({})
      .populate("reviews")
      .skip(page * 5)
      .limit(5);
    return res.status(200).json({
      success: true,
      message: "Get all reviews succeed !",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server !",
    });
  }
};
export const getSingleReview = async (req, res) => {
  const reviewId = req.params.id;
  try {
    // const tour = await Tour.find({ _id: reviewId });
    const review = await Review.findById(reviewId);
    return res.status(200).json({
      success: true,
      message: "Get single review Succeed !",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Internal server !",
    });
  }
};
export const updateReview = async (req, res) => {
  const id = req.params.id;
  try {
    const savedReview = await Review.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Update Review succeed !",
      data: savedReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Update failure !",
    });
  }
};
export const deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    await Review.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "Delete Review succeed !",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failure to delete !",
    });
  }
};
