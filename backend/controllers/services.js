const Service = require("../models/Service");
const Provider = require("../models/Provider");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getServices = async (req, res, next) => {
  try {
    // Copy req.query
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ["select", "sort", "page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    // Create query string
    let queryStr = JSON.stringify(reqQuery);

    // Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`,
    );

    // Finding resource
    let query = Service.find(JSON.parse(queryStr))
      .populate("provider", "businessName location averageRating reviewCount")
      .populate("category", "name");

    // Select Fields
    if (req.query.select) {
      const fields = req.query.select.split(",").join(" ");
      query = query.select(fields);
    }

    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Service.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const services = await query;

    // Pagination result
    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: services.length,
      pagination,
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id)
      .populate("provider", "businessName location averageRating reviewCount")
      .populate("category", "name");

    if (!service) {
      return next(
        new ErrorResponse(`Service not found with id of ${req.params.id}`, 404),
      );
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new service
// @route   POST /api/services
// @access  Private (Provider only)
exports.createService = async (req, res, next) => {
  try {
    // Find provider associated with this user
    const provider = await Provider.findOne({ user: req.user.id });

    if (!provider) {
      return next(
        new ErrorResponse(`No provider found for user ${req.user.id}`, 404),
      );
    }

    // Add provider to req.body
    req.body.provider = provider._id;

    // Create service
    const service = await Service.create(req.body);

    // Add service to provider's services array
    provider.services.push(service._id);
    await provider.save();

    res.status(201).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (Provider only)
exports.updateService = async (req, res, next) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return next(
        new ErrorResponse(`Service not found with id of ${req.params.id}`, 404),
      );
    }

    // Find provider associated with this user
    const provider = await Provider.findOne({ user: req.user.id });

    if (!provider) {
      return next(
        new ErrorResponse(`No provider found for user ${req.user.id}`, 404),
      );
    }

    // Make sure user is service owner
    if (
      service.provider.toString() !== provider._id.toString() &&
      req.user.type !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this service`,
          401,
        ),
      );
    }

    service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (Provider only)
exports.deleteService = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return next(
        new ErrorResponse(`Service not found with id of ${req.params.id}`, 404),
      );
    }

    // Find provider associated with this user
    const provider = await Provider.findOne({ user: req.user.id });

    if (!provider) {
      return next(
        new ErrorResponse(`No provider found for user ${req.user.id}`, 404),
      );
    }

    // Make sure user is service owner
    if (
      service.provider.toString() !== provider._id.toString() &&
      req.user.type !== "admin"
    ) {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this service`,
          401,
        ),
      );
    }

    await service.remove();

    // Remove service from provider's services array
    provider.services = provider.services.filter(
      (serviceId) => serviceId.toString() !== req.params.id,
    );
    await provider.save();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
