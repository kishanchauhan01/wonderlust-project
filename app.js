import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

//setting up the ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//pre Middleware
app.use(express.urlencoded({ extended: true }));

//routes import
import rootRouter from "./routers/index.router.js";
import listingRouter from "./routers/listing.router.js";

//root router
app.use(rootRouter);

//listing router
app.use("/api/v1/listing", listingRouter);
app.use(listingRouter);

export { app };
