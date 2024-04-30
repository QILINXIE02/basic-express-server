'use strict';

const timestampMiddleware = require('../middleware/timestamp');

describe('timestampMiddleware', () => {
  it('should append a timestamp to the request object', () => {
    const req = {};
    const res = { setHeader: jest.fn() };
    const next = jest.fn();

    timestampMiddleware(req, res, next);

    expect(req.timestamp).toBeDefined();
    expect(res.setHeader).toHaveBeenCalledWith('RT', req.timestamp);
    expect(next).toHaveBeenCalled();
  });
});
