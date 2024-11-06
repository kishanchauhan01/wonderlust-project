import { Router } from "express";
import {
  testListing,
  allListings,
  showListing,
  newList,
  addListing,
  editListing,
  updateListing,
} from "../controller/listing.controller.js";
const router = Router();

router.route("/test").get(testListing);

//get request
router.route("/listings").get(allListings);
router.route("/listings/new").get(newList);
router.route("/listings/:id").get(showListing);
router.route("/listings/:id/edit").get(editListing);

//post and put requests
router.route("/listings/add").post(addListing);
router.route("/listings/update/:id").put(updateListing);

export default router;
