const Provider = require("../models/Provider");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");

// @desc    Get all providers
// @route   GET /api/providers
// @access  Public
exports.getProviders = async (req, res, next) => {
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
    let query = Provider.find(JSON.parse(queryStr)).populate(
      "user",
      "name email avatar",
    );

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
    const total = await Provider.countDocuments(JSON.parse(queryStr));

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const providers = await query;

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
      count: providers.length,
      pagination,
      data: providers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single provider
// @route   GET /api/providers/:id
// @access  Public
exports.getProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id)
      .populate("user", "name email avatar")
      .populate("services")
      .populate("categories");

    if (!provider) {
      return next(
        new ErrorResponse(
          `Provider not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new provider
// @route   POST /api/providers
// @access  Private
exports.createProvider = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    // Check if user is already a provider
    const existingProvider = await Provider.findOne({ user: req.user.id });

    if (existingProvider) {
      return next(
        new ErrorResponse(`User ${req.user.id} is already a provider`, 400),
      );
    }

    // Create provider
    const provider = await Provider.create(req.body);

    // Update user type to provider
    await User.findByIdAndUpdate(req.user.id, { type: "provider" });

    res.status(201).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update provider
// @route   PUT /api/providers/:id
// @access  Private
exports.updateProvider = async (req, res, next) => {
  try {
    let provider = await Provider.findById(req.params.id);

    if (!provider) {
      return next(
        new ErrorResponse(
          `Provider not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    // Make sure user is provider owner
    if (provider.user.toString() !== req.user.id && req.user.type !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this provider`,
          401,
        ),
      );
    }

    provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: provider,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete provider
// @route   DELETE /api/providers/:id
// @access  Private
exports.deleteProvider = async (req, res, next) => {
  try {
    const provider = await Provider.findById(req.params.id);

    if (!provider) {
      return next(
        new ErrorResponse(
          `Provider not found with id of ${req.params.id}`,
          404,
        ),
      );
    }

    // Make sure user is provider owner
    if (provider.user.toString() !== req.user.id && req.user.type !== "admin") {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this provider`,
          401,
        ),
      );
    }

    await provider.remove();

    // Update user type back to customer
    await User.findByIdAndUpdate(req.user.id, { type: "customer" });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};
