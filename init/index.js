import initData from "./data.js";
import { Listing } from "../models/listing.model.js";
import { connectDB } from "../db/index.js";

connectDB()
  .then(async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData);
    console.log("data was initialized");
    process.exit(1)
  })
  .catch((err) => console.log("error while inserting data: ", err));
