import express from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  getSingleReview,
  updateReview,
} from "../controllers/reviewController";
const router = express.Router();
router.post("/:tourId", createReview);
export default router;
