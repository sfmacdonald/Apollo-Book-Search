const express = require('express');
const path = require('path');
const db = require('./config/connection');
const routes = require('./routes');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./graphql');
const { authMiddleware } = require('./utils/auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Middleware to handle .jsx files and set their MIME type
app.use((req, res, next) => {
  if (req.url.endsWith('.jsx')) {
    res.setHeader('Content-Type', 'text/jsx');
  }
  next();
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Create an instance of ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Get the user token from the headers
    const token = req.headers.authorization || '';

    // Try to retrieve a user with the token
    const user = authMiddleware(token);

    // Add the user to the context
    return { user };
  },
});

// Start ApolloServer and apply middleware to Express app
async function startApolloServer() {
  await server.start();
  server.applyMiddleware({ app }); // Apply middleware after server has started
}

// Initialize ApolloServer and start Express server
startApolloServer().then(() => {
  // Use routes after applying Apollo middleware
  app.use(routes);

  // Start the Express server
  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });
});

module.exports = app;
