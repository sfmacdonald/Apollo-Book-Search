const jwt = require('jsonwebtoken');

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // Function for authenticated routes
  authMiddleware: function (req, res, next) {
    // Allow token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
      // Verify token and get user data out of it
      const decoded = jwt.verify(token, secret);
      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  },

  // Function to sign JWT token
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
