'use strict';

const { app } = require('../src/server.js');
const supertest = require('supertest');

const mockRequest = supertest(app);

describe('API Server', () => {

    it('should respond with a 404 on an invalid route', async () => {
       let response = await mockRequest.get('/foo');
       expect(response.status).toBe(404);
       expect(response.body.error).toBe('Not Found');
    });

    it('should respond with a 500 when the server has an error', async () => {
        let response = await mockRequest.get('/broken');
        expect(response.status).toBe(500);
    });

    it('should respond with a 200 for the / route', async () => {
        let response = await mockRequest.get('/');
        expect(response.status).toBe(200);
    });

    it('should respond with a "Hello World" for the / route', async () => {
        let response = await mockRequest.get('/');
        expect(response.text).toBe('Hello World');
    });

    it('should respond with a 200 status for a single record route', async () => {
        let response = await mockRequest.get('/data/abc111');
        expect(response.status).toBe(200);
        expect(response.body.name).toBe("John"); // Check if the name is present in the response body
    });

    it('should respond with an object for a single record route', async () => {
        let response = await mockRequest.get('/data/abc111');
        expect(response.body).toBeDefined(); // Check if the response body is defined
    });

    it('should respond with a 200 status for a single record route', async () => {
        let response = await mockRequest.get('/data/abc111');
        expect(response.status).toBe(200);
    });

    it('should respond with an object for a single record route', async () => {
        let response = await mockRequest.get('/data/abc111');
        expect(response.body.name).toBeDefined();
    });

    it('should respond with a 500 status for a invalid single record route', async () => {
        let response = await mockRequest.get('/data/zzz888');
        expect(response.status).toBe(500);
    });

    it('should respond with a 200 status for the /person route with name parameter', async () => {
        let response = await mockRequest.get('/person?name=John');
        expect(response.status).toBe(200);
    });

    it('should respond with an object containing the provided name for the /person route with name parameter', async () => {
        let response = await mockRequest.get('/person?name=John');
        expect(response.body.name).toBe('John');
    });

    it('should respond with a 500 status for the /person route without name parameter', async () => {
        let response = await mockRequest.get('/person');
        expect(response.status).toBe(500);
    });

});
