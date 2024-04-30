'use strict';

const logger = require('./logger');

describe('logger middleware', () => {
  let consoleLogSpy;

  beforeEach(() => {
    // Mock console.log
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.log
    consoleLogSpy.mockRestore();
  });

  it('should log request details', () => {
    const req = {
      method: 'GET',
      path: '/test',
      requestTime: new Date(),
      query: { param1: 'value1', param2: 'value2' },
    };
    const res = {};
    const next = jest.fn();

    logger(req, res, next);

    expect(consoleLogSpy).toHaveBeenCalledWith(`${req.method} ${req.path}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`${req.requestTime}`);
    expect(consoleLogSpy).toHaveBeenCalledWith(`${JSON.stringify(req.query)}`);
    expect(consoleLogSpy).toHaveBeenCalledWith('');
    expect(next).toHaveBeenCalled();
  });
});
