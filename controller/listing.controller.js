import { Listing } from "../models/listing.model.js";

const testListing = async (req, res) => {
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

  res.send("Successful testing...");
};

const allListings = async (req, res) => {
  const all_listings = await Listing.find({});
  res.render("./listings/index.ejs", { all_listings });
};

const showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("./listings/show.ejs", { listing });
};

export { testListing, allListings, showListing };
