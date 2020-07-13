/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
import React from 'react';
// import Amplify from 'aws-amplify';
import Amplify, { Auth } from 'aws-amplify';

const config = {
  REGION: 'us-east-2',
  USER_POOL_ID: 'us-east-2_zrDDO05Jw',
  APP_CLIENT_ID: '6hbiad3sk019r18tfu2kivvsuh',
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
      username: 'tyler.maran+14@gmail.com',
      password: 'coolPassword1!',
    });
    console.log(signUpResponse);
  } catch (error) {
    console.log(error.message);
  }
};

const signIn = async () => {
  try {
    const user = await Auth.signIn(
      'tyler.maran+14@gmail.com',
      'coolPassword1!',
    );
    console.log(user);
  } catch (error) {
    console.log(error.message);
  }
};

const Test = () => {
  return (
    <div style={{ width: '60%', padding: '10rem 0' }}>
      Create account
      <button type="button" onClick={() => signUp()}>
        Sign up!
      </button>
      <button type="button" onClick={() => signIn()}>
        Sign in!
      </button>
    </div>
  );
};

export default Test;
