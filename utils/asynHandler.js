/*
 @param {(req: import("express").Request, res:import("express").Response, next:import("express").NextFunction) => void} requestHandler
 */
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

/*The asyncHandler function takes a requestHandler function as its argument. The requestHandler function is the actual route handler code that might be asynchronous and potentially throw errors.

Purpose: When you pass an asynchronous function as a route handler in Express, any error thrown inside it won't be automatically passed to Express's error handler. Instead, you would need to wrap it with a try/catch block, which can be repetitive. asyncHandler addresses this by:

Wrapping requestHandler in a promise.
Automatically catching any errors and passing them to the next function, which triggers Express’s error-handling middleware.
*/