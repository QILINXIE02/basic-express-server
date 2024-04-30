'use strict';

function timestampMiddleware(req, res, next) {
    req.timestamp = new Date();
    res.setHeader('RT', req.timestamp); // Set response header
    next();
}

module.exports = timestampMiddleware;
