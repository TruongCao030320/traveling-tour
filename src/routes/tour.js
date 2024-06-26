import express from "express";
import {
  createTour,
  deleteTour,
  getSingleTour,
  getTours,
  updateTour,
} from "../controllers/tourController";
import { verify } from "../helpers/verify";
const router = express.Router();
router.post("/create", createTour);
router.get("/", verify, getTours);
router.get("/:id", getSingleTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
