'use strict';

const validatorMiddleware = require('./validator');

describe('validatorMiddleware', () => {
  it('should throw error for missing ID parameter', () => {
    const req = { params: {} };
    const res = {};
    const next = jest.fn();

    expect(() => validatorMiddleware(req, res, next)).toThrowError('Missing ID parameter');
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() for valid request with ID', () => {
    const req = { params: { id: 'abc123' } };
    const res = {};
    const next = jest.fn();

    validatorMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
