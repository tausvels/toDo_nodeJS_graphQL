/** 
 * Loading Environment variables 
 * */
require('dotenv').config();
/**
 * App dependecies, Middleware, Mongoose and GraphQL
 */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');

/**
 * Setting Server
 */
const app = express();
/**
 * Initialize middleware to be consumed
 */

/**
 * Initialize Database Connection and start server once connected
 */
mongoose.connect(process.env.mongoDbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then( () => {
  console.log('MongoDB database connected...');
  app.listen(process.env.PORT || 8080, () => {
    if (process.env.PORT) {
      console.log(`Server started at port: ${process.env.PORT}`)
    } else {
      console.log(`Server started at port: 8080`)
    }
  })
})
.catch (err => {
  console.log(err);
  throw err;
});