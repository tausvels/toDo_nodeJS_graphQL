const mongoose = require('mongoose');

const dbConnection = () => {
  return mongoose.connect(process.env.mongoDbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

module.exports = dbConnection;