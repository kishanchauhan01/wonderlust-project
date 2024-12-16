import { validateListingSchema } from "../models/validate.model.js";
import { ApiError } from "../utils/ApiError.js";

export const validateListing = (req, _, next) => {
  const { error } = validateListingSchema.validate(req.body);
  if (error) {
    throw new ApiError(400, error);
  } else {
    next();
  }
};
