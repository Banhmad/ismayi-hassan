const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service",
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    required: true,
  },
  date: {
    type: Date,
    required: [true, "Please add a booking date"],
  },
  timeSlot: {
    start: {
      type: String,
      required: [true, "Please add a start time"],
    },
    end: {
      type: String,
      required: [true, "Please add an end time"],
    },
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled", "rejected"],
    default: "pending",
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "refunded", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "credit_card", "digital_currency", "other"],
    default: "cash",
  },
  paymentDetails: {
    transactionId: String,
    paymentDate: Date,
    receiptUrl: String,
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  notes: String,
  customerRequirements: String,
  attachments: [String],
  reviewed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
