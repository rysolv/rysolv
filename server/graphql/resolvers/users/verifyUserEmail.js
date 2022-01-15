const { errorLogger, sendEmail } = require('../../../helpers');
const { generateToken } = require('../../../middlewares/generateToken');
const { transformUser: transformUserQuery } = require('../../../db');
const { verifyCognitoEmail } = require('../../../middlewares/awsConfig');
const { verifyUserEmailError, verifyUserEmailSuccess } = require('./constants');

const verifyUserEmail = async ({ code, companyId, email, userId }, { res }) => {
  try {
    // Verify email code with Cognito
    await verifyCognitoEmail({ code, email });

    // Set email_verified = true in db
    const data = {
      email_verified: true,
      modified_date: new Date(),
    };
    await transformUserQuery({ data, userId });

    const token = generateToken({ email, provider: 'cognito', userId });
    res.cookie('userToken', token, {
      httpOnly: true,
      maxAge: process.env.COOKIE_EXPIRATION,
    });
    res.cookie('signedIn', true, {
      maxAge: process.env.COOKIE_EXPIRATION,
    });

    if (companyId) {
      sendEmail({
        body: { userId },
        path: '/s/users/welcome',
      });
    } else {
      sendEmail({
        body: { userId },
        path: '/s/company/welcome',
      });
    }

    return {
      __typename: 'Success',
      message: verifyUserEmailSuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: verifyUserEmailError,
    };
  }
};

module.exports = verifyUserEmail;
