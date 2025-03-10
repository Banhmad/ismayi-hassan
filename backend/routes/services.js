const express = require("express");
const {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
} = require("../controllers/services");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.route("/").get(getServices);
router.route("/:id").get(getService);

// Protected routes
router.use(protect);
router.route("/").post(authorize("provider", "admin"), createService);
router
  .route("/:id")
  .put(authorize("provider", "admin"), updateService)
  .delete(authorize("provider", "admin"), deleteService);

module.exports = router;
