const CognitoExpress = require('cognito-express');

// Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_DEFAULT_REGION,
  cognitoUserPoolId: process.env.USER_POOL_ID,
  tokenUse: 'access',
  tokenExpiration: 3600000,
});

// Extract userId from JWT
const validateToken = async (req, res, next) => {
  const {
    variables: { token },
  } = req.body;

  if (token) {
    try {
      const { username: userId } = await cognitoExpress.validate(token);
      req.body.userId = userId;
    } catch (err) {
      // Log error
    }
  }
  next();
};

module.exports = validateToken;
