import mongoose from "mongoose";
import { DB_Name } from "../constants.js";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_Name}`);
    console.log("MongoDB connected...");
  } catch (error) {
    throw console.error("mongoDB connection error: ", error);
    process.exit(1); //it will exit the code if any asyn process is remaining then and then it will exit the code
  }
};

export { connectDB };
