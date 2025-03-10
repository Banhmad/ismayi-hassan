const express = require("express");
const {
  getProviders,
  getProvider,
  createProvider,
  updateProvider,
  deleteProvider,
} = require("../controllers/providers");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.route("/").get(getProviders);
router.route("/:id").get(getProvider);

// Protected routes
router.use(protect);
router.route("/").post(createProvider);
router.route("/:id").put(updateProvider).delete(deleteProvider);

module.exports = router;
