const Review = require("../models/Review");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Provider = require("../models/Provider");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
exports.getReviews = async (req, res, next) => {
  try {
    let query;

    // If service ID is provided, get reviews for that service
    if (req.query.service) {
      query = Review.find({ service: req.query.service })
        .populate("user", "name avatar")
        .sort("-createdAt");
    }
    // If provider ID is provided, get reviews for that provider
    else if (req.query.provider) {
      query = Review.find({ provider: req.query.provider })
        .populate("user", "name avatar")
        .populate("service", "title")
        .sort("-createdAt");
    }
    // Otherwise, get all reviews
    else {
      query = Review.find()
        .populate("user", "name avatar")
        .populate("service", "title")
        .populate("provider", "businessName")
        .sort("-createdAt");
    }

    const reviews = await query;

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single review
// @route   GET /api/reviews/:id
// @access  Public
exports.getReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "name avatar")
      .populate("service", "title price images")
      .populate("provider", "businessName");

    if (!review) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404),
      );
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private (Customer only)
exports.createReview = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check if service exists
    const service = await Service.findById(req.body.service);

    if (!service) {
      return next(
        new ErrorResponse(
          `Service not found with id of ${req.body.service}`,
          404,
        ),
      );
    }

    // Add provider to req.body
    req.body.provider = service.provider;

    // Check if booking exists and is completed
    if (req.body.booking) {
      const booking = await Booking.findById(req.body.booking);

      if (!booking) {
        return next(
          new ErrorResponse(
            `Booking not found with id of ${req.body.booking}`,
            404,
          ),
        );
      }

      if (booking.customer.toString() !== req.user.id) {
        return next(
          new ErrorResponse(
            `User ${req.user.id} is not authorized to review this booking`,
            401,
          ),
        );
      }

      if (booking.status !== "completed") {
        return next(
          new ErrorResponse(
            `Cannot review a booking that is not completed`,
            400,
          ),
        );
      }

      // Mark booking as reviewed
      booking.reviewed = true;
      await booking.save();
    }

    // Check if user already reviewed this service
    const existingReview = await Review.findOne({
      user: req.user.id,
      service: req.body.service,
    });

    if (existingReview) {
      return next(new ErrorResponse(`User already reviewed this service`, 400));
    }

    // Create review
    const review = await Review.create(req.body);

    res.status(201).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404),
      );
    }

    // Check if user is review owner or provider
    if (review.user.toString() === req.user.id) {
      // User can update their own review
      const allowedFields = ["rating", "comment", "images"];
      Object.keys(req.body).forEach((key) => {
        if (!allowedFields.includes(key)) {
          delete req.body[key];
        }
      });
    } else if (req.user.type === "provider") {
      // Provider can only add a reply
      const provider = await Provider.findOne({ user: req.user.id });

      if (!provider || review.provider.toString() !== provider._id.toString()) {
        return next(
          new ErrorResponse(
            `User ${req.user.id} is not authorized to update this review`,
            401,
          ),
        );
      }

      // Provider can only update the reply
      if (req.body.reply) {
        req.body = {
          reply: {
            content: req.body.reply,
            date: Date.now(),
          },
        };
      } else {
        return next(
          new ErrorResponse(`Providers can only add a reply to reviews`, 400),
        );
      }
    } else {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this review`,
          401,
        ),
      );
    }

    review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(
        new ErrorResponse(`Review not found with id of ${req.params.id}`, 404),
      );
    }

    // Make sure user is review owner or admin
    if (review.user.toString() !== req.user.id && req.user.type !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this review`,
          401,
        ),
      );
    }

    await review.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
