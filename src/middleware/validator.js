'use strict';

function validatorMiddleware(req, res, next) {
  if (!req.params.id) { // Check for missing id
    return next(new Error('Missing ID parameter')); // Throw the error with the message
  }
  next(); // Call next() for valid request
}

module.exports = validatorMiddleware;
