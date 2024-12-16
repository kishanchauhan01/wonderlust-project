import { Listing } from "../models/listing.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asynHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { APIV } from "../constants.js";

const testListing = asyncHandler(async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the beach",
    price: 12000,
    location: "Calangute, Goa",
    country: "India",
  });

  await sampleListing
    .save()
    .then((result) => console.log(result))
    .catch((error) => console.log(error));

  return res.status(200).send("Successful testing...");
});

//allListings route
const allListings = asyncHandler(async (req, res) => {
  const all_listings = await Listing.find({});
  if (!all_listings) {
    throw new ApiError(500, "Data not fetched from database");
  }
  return res.status(200).render("./listings/index.ejs", { all_listings });
});

const showListing = asyncHandler(async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  return res.status(200).render("./listings/show.ejs", { listing });
});

//newList route
const newList = asyncHandler((req, res) => {
  return res.status(200).render("./listings/new.ejs");
});

const addListing = asyncHandler(async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  return res.status(200).redirect(APIV + "/");
});

//edit route
const editListing = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  return res.status(200).render("./listings/edit.ejs", { listing });
});

const updateListing = asyncHandler(async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  return res.status(200).redirect(APIV + `/${id}`);
});

const deleteListing = asyncHandler(async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  return res.status(200).redirect(APIV);
});

const reviewListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);

  //add the id of review document to the respective listing document
  listing.reviews.push(newReview);
  await newReview.save();
  await listing.save();
  console.log(`new review saved: ${newReview}`);
  return res.status(200).send("review added");
});

export {
  testListing,
  allListings,
  showListing,
  newList,
  addListing,
  editListing,
  updateListing,
  deleteListing,
  reviewListing,
};
