/** 
 * Loading Environment variables 
 * */
require('dotenv').config();
/**
 * App dependecies, GraphQL, Middlewares, and db connection 
 */
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const isAuth = require('./middleware/isAuth');
const cors = require('./middleware/cors');
const dbConnection = require('./db/dbConnection');

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
app.use(cors);
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
  await dbConnection();
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