import { Router } from "express";
import {
  testListing,
  allListings,
  showListing,
} from "../controller/listing.controller.js";
const router = Router();

router.route("/test").get(testListing);

router.route("/listings").get(allListings);
router.route("/listings/:id").get(showListing);

export default router;
