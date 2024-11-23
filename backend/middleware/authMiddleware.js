// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract the token
      token = req.headers.authorization.split(' ')[1];

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET is stored in your .env

      // Attach the user (or student/teacher) data to the request
      req.user = decoded;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Invalid token:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // If no token is provided, return an error
  if (!token) {
    res.status(401).json({ message: 'No token, authorization denied' });
  }
};
module.exports = protect;