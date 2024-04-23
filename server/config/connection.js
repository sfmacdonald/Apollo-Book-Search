const mongoose = require('mongoose');

// Define the mongoURI variable with an environment variable or default to localhost
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

// Use the mongoURI in your connection setup
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = mongoose.connection;

