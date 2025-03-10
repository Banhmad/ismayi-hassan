const express = require("express");
const {
  getReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviews");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.route("/").get(getReviews);
router.route("/:id").get(getReview);

// Protected routes
router.use(protect);
router.route("/").post(authorize("customer"), createReview);
router.route("/:id").put(updateReview).delete(deleteReview);

module.exports = router;
