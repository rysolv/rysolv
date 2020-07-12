/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React from 'react';
// import Amplify from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';

const config = {
  REGION: 'us-east-2',
  USER_POOL_ID: 'us-east-2_KhLkhtKf8',
  APP_CLIENT_ID: '1oqcfq3ul83jmqi21aki2thg94',
};

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.REGION,
    userPoolId: config.USER_POOL_ID,
    userPoolWebClientId: config.APP_CLIENT_ID,
  },
});
const signUp = async () => {
  try {
    const signUpResponse = await Auth.signUp({
      username: 'tyllllllerrrr',
      password: 'Readypl@yer1',
      attributes: {
        email: 'tyler.maran@gmail.com',
      },
    });
    console.log(signUpResponse);
  } catch (error) {
    console.log(error.message);
  }
};
signUp();

const Test = () => {
  return <div style={{ width: '60%' }}>Create account</div>;
};

export default Test;
