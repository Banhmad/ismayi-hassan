const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Please add a title"],
    trim: true,
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategory: String,
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  priceType: {
    type: String,
    enum: ["fixed", "hourly", "daily", "custom"],
    default: "fixed",
  },
  images: [String],
  features: [String],
  availability: {
    monday: { available: Boolean, slots: [{ start: String, end: String }] },
    tuesday: { available: Boolean, slots: [{ start: String, end: String }] },
    wednesday: { available: Boolean, slots: [{ start: String, end: String }] },
    thursday: { available: Boolean, slots: [{ start: String, end: String }] },
    friday: { available: Boolean, slots: [{ start: String, end: String }] },
    saturday: { available: Boolean, slots: [{ start: String, end: String }] },
    sunday: { available: Boolean, slots: [{ start: String, end: String }] },
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  isRemote: {
    type: Boolean,
    default: false,
  },
  averageRating: {
    type: Number,
    min: [1, "Rating must be at least 1"],
    max: [5, "Rating cannot be more than 5"],
    default: 0,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  active: {
    type: Boolean,
    default: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Service", ServiceSchema);
