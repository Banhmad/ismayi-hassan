const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a category name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name cannot be more than 50 characters"],
  },
  slug: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  icon: String,
  image: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    default: null,
  },
  subcategories: [
    {
      name: String,
      slug: String,
      description: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug from name before saving
CategorySchema.pre("save", function (next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, "-");
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
