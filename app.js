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
const isAuth = require('./middleware/isAuth');

/**
 * Requiring graphQL Schema and Resolvers
 */
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers= require('./graphql/resolvers');

/**
 * Setting Server
 */
const app = express();
/**
 * Initialize middleware to be consumed
 */
// preventing cross-origin problem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "Options") {
    return res.sendStatus(200);
  }
  next();
});
app.use(bodyParser.json());
app.use(isAuth);
app.use('/graphql', graphqlHTTP({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}));

/**
 * Initialize Database Connection and start server once connected
 */
const startServer = async () => {
  await mongoose.connect(process.env.mongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  try {
    app.listen(process.env.PORT || 8080, () => {
      if (process.env.PORT) {
        console.log(`Server started at port: ${process.env.PORT}`)
      } else {
        console.log("Server started at port: 8080")
      }
    }) 
  } catch (err) { 
    console.log(err)
    throw err;
  }
};

startServer();