import mongoose from "mongoose";
import { Schema } from "mongoose";
const bookingSchema = new Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
    },
    guestSize: {
      type: Number,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    bookAt: {
      type: Date,
      //   require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
