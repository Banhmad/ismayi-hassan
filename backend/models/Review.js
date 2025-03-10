const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  user: {
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
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, "Please add a rating between 1 and 5"],
  },
  comment: {
    type: String,
    required: [true, "Please add a comment"],
  },
  images: [String],
  reply: {
    content: String,
    date: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from submitting more than one review per service
ReviewSchema.index({ user: 1, service: 1 }, { unique: true });

// Static method to calculate average rating for a service
ReviewSchema.statics.getAverageRating = async function (serviceId) {
  const obj = await this.aggregate([
    {
      $match: { service: serviceId },
    },
    {
      $group: {
        _id: "$service",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  try {
    if (obj[0]) {
      await this.model("Service").findByIdAndUpdate(serviceId, {
        averageRating: obj[0].averageRating.toFixed(1),
        reviewCount: obj[0].reviewCount,
      });

      // Also update provider's average rating
      const service = await this.model("Service").findById(serviceId);
      if (service) {
        const providerReviews = await this.aggregate([
          {
            $match: { provider: service.provider },
          },
          {
            $group: {
              _id: "$provider",
              averageRating: { $avg: "$rating" },
              reviewCount: { $sum: 1 },
            },
          },
        ]);

        if (providerReviews[0]) {
          await this.model("Provider").findByIdAndUpdate(service.provider, {
            averageRating: providerReviews[0].averageRating.toFixed(1),
            reviewCount: providerReviews[0].reviewCount,
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

// Call getAverageRating after save
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.service);
});

// Call getAverageRating after remove
ReviewSchema.post("remove", function () {
  this.constructor.getAverageRating(this.service);
});

module.exports = mongoose.model("Review", ReviewSchema);
