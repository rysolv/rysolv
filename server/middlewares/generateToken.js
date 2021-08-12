const jwt = require('jsonwebtoken');

const generateToken = ({ email, provider, userId }) => {
  const token = jwt.sign(
    { email, provider, userId },
    process.env.JWT_SECRET_KEY,
    {
      algorithm: 'HS256',
      expiresIn: process.env.JWT_EXPIRATION,
    },
  );

  return token;
};

module.exports = { generateToken };
