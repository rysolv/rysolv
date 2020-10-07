const CognitoExpress = require('cognito-express');

// Initializing CognitoExpress constructor
const cognitoExpress = new CognitoExpress({
  cognitoUserPoolId: process.env.USER_POOL_ID,
  region: process.env.AWS_DEFAULT_REGION,
  tokenExpiration: 3600000,
  tokenUse: 'access',
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
    } catch (error) {
      req.body.authError = 'You must be signed in to access this feature.';
    }
  }
  next();
};

module.exports = validateToken;
