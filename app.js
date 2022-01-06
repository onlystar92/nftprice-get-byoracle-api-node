/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */

import express from 'express';
import dotenv from 'dotenv';

import bodyParser from 'body-parser';
import cors from 'cors';

import apiRoutes from './src/routes/api';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./src/config/sequelize');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());

function validateAuthorization(req) {
  return (
    req.header('Authorization') &&
    req.header('Authorization') === process.env.SECRET_KEY
  );
}

app.use('/api', (req, res, next) => {
  if (!validateAuthorization(req)) {
    res.send({
      meta: {
        code: 99,
        message: 'Authentication Required',
        description: 'The provided auth token is not valid',
      },
    });
  } else {
    next();
  }
});

app.use('/api/v1', apiRoutes);
app.use(errorHandler);

module.exports = app;
