import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";

const app = express();

//setting up the ejs
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));

//pre Middleware
app.use(express.urlencoded({ extended: true }));//extract data from url
app.use(methodOverride("_method"));

//routes import
import rootRouter from "./routers/index.router.js";
import listingRouter from "./routers/listing.router.js";

//root router
app.use(rootRouter);

//listing router
app.use("/api/v1/listings", listingRouter);

export { app };
