const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const catchAsync = require("../utils/catchAsync");
const reviewsControllers = require("../controllers/reviews");
const Campground = require("../models/campground");
const Review = require("../models/review");

router.post(
  "/",
  isLoggedIn,
  validateReview,
  catchAsync(reviewsControllers.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviewsControllers.deleteReview)
);

module.exports = router;
