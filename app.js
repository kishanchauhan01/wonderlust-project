import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
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

// app.use((req, res, next) => {
//   let {token} = req.query;
//   if(token === 'giveaccess') {
//     next()
//   } else {
//     res.status(400).send("Access denied")
//   }
// })


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
app.use(express.urlencoded({ extended: true })); //extract data from url
app.use(methodOverride("_method"));

//routes import
import rootRouter from "./routers/index.router.js";
import listingRouter from "./routers/listing.router.js";

//root router
app.use(rootRouter);

//listing router
app.use("/api/v1/listings", listingRouter);




app.use((req, res) => {
    res.status(404  ).send("404, Page not found !")
})
export { app };
