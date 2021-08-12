const jwt = require('jsonwebtoken');

// Extract userId from JWT
const validateToken = async (req, res, next) => {
  const { userToken } = req.cookies;

  if (userToken) {
    try {
      const { email, provider, userId } = jwt.verify(
        userToken,
        process.env.JWT_SECRET_KEY,
      );
      req.body.email = email;
      req.body.provider = provider;
      req.body.userId = userId;
    } catch (error) {
      req.body.authError = 'You must be signed in to access this feature.';
    }
  }

  next();
};

module.exports = validateToken;
