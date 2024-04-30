'use strict';

function validatorMiddleware(req, res, next) {
    if (!req.params.id) {
        return next(new Error('Missing ID parameter'));
    }

    // Add timestamp to the request object
    req.timestamp = new Date();
    res.setHeader('RT', req.timestamp); // Set response header

    next();
}

module.exports = validatorMiddleware;
