import { Router } from "express";
import {
  testListing,
  allListings,
  showListing,
  newList,
  addListing,
  editListing,
  updateListing,
  deleteListing,
} from "../controller/listing.controller.js";
const router = Router();

router.route("/test").get(testListing);

//get request (render ejs endpoints)
router.route("/").get(allListings);
router.route("/new").get(newList);
router.route("/:id").get(showListing); //show route
router.route("/:id/edit").get(editListing);

//post and put requests
router.route("/add").post(addListing);
router.route("/:id/update").put(updateListing);
router.route("/:id/delete").delete(deleteListing);

export default router;
