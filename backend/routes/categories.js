const express = require("express");
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Public routes
router.route("/").get(getCategories);
router.route("/:id").get(getCategory);

// Protected routes
router.use(protect);
router.use(authorize("admin"));
router.route("/").post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

module.exports = router;
