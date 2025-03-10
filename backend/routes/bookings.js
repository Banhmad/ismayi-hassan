const express = require("express");
const {
  getBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Protect all routes
router.use(protect);

// Booking routes
router.route("/").get(getBookings).post(authorize("customer"), createBooking);
router.route("/:id").get(getBooking).put(updateBooking).delete(deleteBooking);

module.exports = router;
