const passport = require("passport");
const ErrorResponse = require("../utils/errorResponse");

// Middleware to protect routes
exports.protect = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(new ErrorResponse("Authentication error", 500));
    }

    if (!user) {
      return next(
        new ErrorResponse("Not authorized to access this route", 401),
      );
    }

    req.user = user;
    next();
  })(req, res, next);
};

// Middleware to restrict access to specific user types
exports.authorize = (...types) => {
  return (req, res, next) => {
    if (!types.includes(req.user.type)) {
      return next(
        new ErrorResponse(
          `User type ${req.user.type} is not authorized to access this route`,
          403,
        ),
      );
    }
    next();
  };
};
