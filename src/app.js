import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { ApiError } from "./utils/ApiError.js";
import fs from "fs";

const app = express();

//setting up the ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

//pre Middleware
//To write and maintain LOG file
/*
app.use((req, res, next) => {
  req.time = new Date(Date.now());
  const logData = `
  ==========================
  Method: ${req.method}
  Hostname: ${req.hostname}
  Path: ${req.path}
  IP: ${req.ip}
  Time: ${req.time}
  ==========================\n`;
  fs.appendFile(path.join(__dirname, "LOG.txt"), logData, (err) => {
    if (err) {
      console.log("Failed to write LOG: ", err);
    }
  });

  next();
});
*/
app.use(express.urlencoded({ extended: true })); //extract data from url
app.use(methodOverride("_method"));

app.use((err, req, res, next) => {
  let { statusCode, message } = err;
  res.status(statusCode).send(message);
});

//routes import
import rootRouter from "./routers/index.router.js";
import listingRouter from "./routers/listing.router.js";

//root router
app.use(rootRouter);

//listing router
app.use("/api/v1/listings", listingRouter);

//Handling for unvalid path
//The following callback is executed for requests to "/" whether using GET, POST, PUT, DELETE, or any other HTTP request method. he app.all() method is useful for mapping “global” logic for specific path prefixes or arbitrary matches.
app.all("*", (req, res, next) => {
  next(new ApiError(404, "404, page not found!"));
});

//error middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;
  res.status(statusCode).render("error.ejs", { err });
});

export { app };
