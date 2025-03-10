const Booking = require("../models/Booking");
const Service = require("../models/Service");
const Provider = require("../models/Provider");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res, next) => {
  try {
    let query;

    // If user is a customer, get only their bookings
    if (req.user.type === "customer") {
      query = Booking.find({ customer: req.user.id })
        .populate("service", "title price")
        .populate("provider", "businessName");
    }
    // If user is a provider, get bookings for their services
    else if (req.user.type === "provider") {
      // Find provider associated with this user
      const provider = await Provider.findOne({ user: req.user.id });

      if (!provider) {
        return next(
          new ErrorResponse(`No provider found for user ${req.user.id}`, 404),
        );
      }

      query = Booking.find({ provider: provider._id })
        .populate("service", "title price")
        .populate("customer", "name email");
    }
    // If admin, get all bookings
    else {
      query = Booking.find()
        .populate("service", "title price")
        .populate("provider", "businessName")
        .populate("customer", "name email");
    }

    // Add sorting
    query = query.sort("-createdAt");

    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("service", "title price images")
      .populate("provider", "businessName location contactPhone contactEmail")
      .populate("customer", "name email phone");

    if (!booking) {
      return next(
        new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404),
      );
    }

    // Make sure user is booking owner or provider
    if (
      booking.customer.toString() !== req.user.id &&
      req.user.type !== "admin"
    ) {
      // If user is provider, check if booking is for their service
      if (req.user.type === "provider") {
        const provider = await Provider.findOne({ user: req.user.id });

        if (
          !provider ||
          booking.provider.toString() !== provider._id.toString()
        ) {
          return next(
            new ErrorResponse(
              `User ${req.user.id} is not authorized to access this booking`,
              401,
            ),
          );
        }
      } else {
        return next(
          new ErrorResponse(
            `User ${req.user.id} is not authorized to access this booking`,
            401,
          ),
        );
      }
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private (Customer only)
exports.createBooking = async (req, res, next) => {
  try {
    // Add customer to req.body
    req.body.customer = req.user.id;

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

    // Create booking
    const booking = await Booking.create(req.body);

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(
        new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404),
      );
    }

    // Check if user is authorized to update booking
    if (req.user.type === "customer") {
      // Customers can only update their own bookings
      if (booking.customer.toString() !== req.user.id) {
        return next(
          new ErrorResponse(
            `User ${req.user.id} is not authorized to update this booking`,
            401,
          ),
        );
      }

      // Customers can only update certain fields
      const allowedFields = ["notes", "customerRequirements", "attachments"];
      Object.keys(req.body).forEach((key) => {
        if (!allowedFields.includes(key)) {
          delete req.body[key];
        }
      });
    } else if (req.user.type === "provider") {
      // Providers can only update bookings for their services
      const provider = await Provider.findOne({ user: req.user.id });

      if (
        !provider ||
        booking.provider.toString() !== provider._id.toString()
      ) {
        return next(
          new ErrorResponse(
            `User ${req.user.id} is not authorized to update this booking`,
            401,
          ),
        );
      }

      // Providers can only update certain fields
      const allowedFields = ["status", "notes"];
      Object.keys(req.body).forEach((key) => {
        if (!allowedFields.includes(key)) {
          delete req.body[key];
        }
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return next(
        new ErrorResponse(`Booking not found with id of ${req.params.id}`, 404),
      );
    }

    // Make sure user is booking owner or admin
    if (
      booking.customer.toString() !== req.user.id &&
      req.user.type !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this booking`,
          401,
        ),
      );
    }

    await booking.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
