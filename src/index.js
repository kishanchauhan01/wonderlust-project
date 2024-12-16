import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
import { connectDB } from "./db/index.js";
import { app } from "./app.js";

//here we just connect the db and listening on a port
connectDB()
  .then(() => {
    app.listen(8080, () => {
      console.log("app is listening on http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log("MongoDB connection failed !! ", err);
  });
