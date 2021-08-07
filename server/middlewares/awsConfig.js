/* eslint-disable prefer-promise-reject-errors */
const AWS = require('aws-sdk');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const { v4: uuidv4 } = require('uuid');

const { bucketNameDictionary } = require('../constants');

AWS.config.update({ region: process.env.AWS_DEFAULT_REGION });

const production = process.env.NODE_ENV === 'production';
const cognitoClientId = production
  ? process.env.APP_CLIENT_ID
  : process.env.APP_CLIENT_ID_DEV;

const cognitoUserPoolId = production
  ? process.env.USER_POOL_ID
  : process.env.USER_POOL_ID_DEV;

// Required for admin functions
const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const poolData = {
  ClientId: cognitoClientId,
  UserPoolId: cognitoUserPoolId,
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const getUserPool = () => new AmazonCognitoIdentity.CognitoUserPool(poolData);

const getAuthDetails = (email, password) => {
  const authenticationData = {
    Password: password,
    Username: email,
  };
  return new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
};

const getCognitoUser = email => {
  const userData = {
    Pool: getUserPool(),
    Username: email,
  };
  return new AmazonCognitoIdentity.CognitoUser(userData);
};

// Authenticate user and return userId if successful
const authenticateCognitoUser = ({ password, username }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(username);

    cognitoUser.authenticateUser(getAuthDetails(username, password), {
      onSuccess: ({ accessToken }) => {
        const {
          payload: { sub: userId },
        } = accessToken;
        resolve({ userId });
      },
      onFailure: error => {
        reject({ alert: error.message });
      },
    });
  });

// Delete user from cognito (requires admin)
const deleteCognitoUser = ({ email }) =>
  new Promise((resolve, reject) => {
    const params = {
      Username: email,
      UserPoolId: cognitoUserPoolId,
    };

    CognitoIdentityServiceProvider.adminDeleteUser(params, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

// Generates a verification code and sends it to the user
const forgotCognitoPassword = ({ email }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.forgotPassword({
      onSuccess: result => {
        resolve(result);
      },
      onFailure: error => {
        reject(error);
      },
    });
  });

// Create new user in cognito (return userId)
const registerCognitoUser = ({ email, password }) =>
  new Promise((resolve, reject) => {
    const userPool = getUserPool();

    userPool.signUp(email, password, [], null, (error, result) => {
      if (error) {
        reject({ alert: error.message });
      } else {
        const { userSub: userId } = result;
        resolve({ userId });
      }
    });
  });

// Resend confirmation code to user email
const resendConfirmationCode = ({ email }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.resendConfirmationCode((error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

// Reset cognito password
const resetCognitoPassword = ({ code, email, password }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.confirmPassword(code, password, {
      onFailure: error => {
        reject({ alert: error.message });
      },
      onSuccess: result => {
        resolve(result);
      },
    });
  });

// Create new user in cognito (return userId)
const updateCognitoEmail = ({ currentEmail, newEmail }) =>
  new Promise((resolve, reject) => {
    const params = {
      UserAttributes: [
        {
          Name: 'email',
          Value: newEmail,
        },
      ],
      UserPoolId: cognitoUserPoolId,
      Username: currentEmail,
    };

    CognitoIdentityServiceProvider.adminUpdateUserAttributes(
      params,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );
  });

const uploadFileS3 = async ({ file, key = null, type }) => {
  const generalType = type.split('/')[0];
  const bucketName = bucketNameDictionary[generalType];
  const fileKey = key || `${bucketName}/${uuidv4()}`;
  const fileBuffer = Buffer.from(file, 'base64');
  const payload = {
    Body: fileBuffer,
    Bucket: bucketName,
    ContentEncoding: 'base64',
    ContentType: type,
    Key: fileKey,
  };
  const result = await s3.upload(payload).promise();
  return result;
};

// Verify user email
const verifyCognitoEmail = ({ code, email }) =>
  new Promise((resolve, reject) => {
    const cognitoUser = getCognitoUser(email);

    cognitoUser.confirmRegistration(code, true, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });

module.exports = {
  authenticateCognitoUser,
  deleteCognitoUser,
  forgotCognitoPassword,
  registerCognitoUser,
  resendConfirmationCode,
  resetCognitoPassword,
  updateCognitoEmail,
  uploadFileS3,
  verifyCognitoEmail,
};
