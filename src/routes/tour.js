import express from "express";
import {
  createTour,
  deleteTour,
  getSingleTour,
  getTours,
  updateTour,
} from "../controllers/tourController";
const router = express.Router();
router.post("/create", createTour);
router.get("/", getTours);
router.get("/:id", getSingleTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
