'use strict';

const validatorMiddleware = require('../middleware/validator');

describe('validatorMiddleware', () => {
    it('should throw error for missing ID parameter', () => {
        const req = { params: {} }; // Empty params object
        const res = {};
        const next = jest.fn();

        validatorMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(new Error('Missing ID parameter'));
    });

    it('should call next() for valid request with ID', () => {
        const req = { params: { id: 'abc123' } }; // Valid request with id
        const res = { setHeader: jest.fn() };
        const next = jest.fn();

        validatorMiddleware(req, res, next);

        expect(next).toHaveBeenCalled();
    });

    it('should append a timestamp to the request object', () => {
        const req = { params: { id: 'abc123' } }; // Valid request with id
        const res = { setHeader: jest.fn() };
        const next = jest.fn();

        validatorMiddleware(req, res, next);

        expect(req.timestamp).toBeDefined();
        expect(res.setHeader).toHaveBeenCalledWith('RT', req.timestamp);
        expect(next).toHaveBeenCalled();
    });
});
