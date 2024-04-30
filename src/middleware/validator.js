use strict';

function validatorMiddleware(req, res, next) {
  if (!req.params.id) {
    return next(new Error('Missing ID parameter'));
  }
  next();
}

module.exports = validatorMiddleware;
