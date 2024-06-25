import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log("Connect with database succeed!");
  } catch (error) {
    console.log(error);
  }
};
