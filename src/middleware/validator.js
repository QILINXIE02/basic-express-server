'use strict';

function validatorMiddleware(req, res, next) {
    if (!req.query.name) {
        return next(new Error('Missing name parameter'));
    }

    // Add timestamp to the request object
    req.timestamp = new Date();
    res.setHeader('RT', req.timestamp); // Set response header

    next();
}

module.exports = validatorMiddleware;
