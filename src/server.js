'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const handleNotFound = require('./error-handlers/404.js');
const handleError = require('./error-handlers/500.js');
const logger = require('./middleware/logger.js');
const validatorMiddleware = require('./middleware/validator');

const app = express();

let database = {
    abc111: { name: "John" },
    def222: { name: "Cathy" },
    ghi333: { name: "Zachary" },
    jkl444: { name: "Allie" },
};

app.use(cors()); // no restrictions on the app working on the internet

app.use(logger);


// route definition
app.get('/', getHomePage);
app.get('/data', getData);
app.get('/data/:id', getOneRecord);  // /data/abc111
app.get('/broken', simulateError);
app.get('/person', validatorMiddleware, getPerson); // Added validator middleware
app.get("*", handleNotFound);
app.use( handleError );


// Route Handlers

function getData(req, res) {
    res.status(200).json(database);
}

function getOneRecord( req, res, next ) {
    // http://localhost:3000/data/abc111 => req.params.id = "abc111"
    let id = req.params.id;
    if(database[id]) {
        res.status(200).json(database[id]);
    } else {
        next("Record Not Found")
    }
}

function getHomePage(req, res) {
    res.status(200).send("Hello World");
}

function simulateError(req, res, next) {
    next("We have a problem");
}

function getPerson(req, res, next) {
    const name = req.query.name;
    if (name) {
      res.status(200).json({ name });
    } else {
      next(new Error("Missing name parameter")); // Handle missing name with 500 error
    }
  }
  app.use("*", handleNotFound);
  app.use(handleError);

function start(port) {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = {app, start};
