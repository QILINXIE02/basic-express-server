'use strict';

const validatorMiddleware = require('../middleware/validator');

describe('validatorMiddleware', () => {
    it('should throw error for missing name parameter', () => {
        const req = { query: {} }; // Missing name parameter
        const res = {};
        const next = jest.fn();

        validatorMiddleware(req, res, next);

        expect(next).toHaveBeenCalledWith(new Error('Missing name parameter'));
    });

    it('should append a timestamp to the request object and set RT header in response', () => {
        const req = { query: { name: 'John' } }; // Valid request with name
        const res = { setHeader: jest.fn() };
        const next = jest.fn();

        validatorMiddleware(req, res, next);

        expect(req.timestamp).toBeDefined();
        expect(res.setHeader).toHaveBeenCalledWith('RT', req.timestamp);
        expect(next).toHaveBeenCalled();
    });
});
