import Auth from '@aws-amplify/auth';

export const fetchCurrentSession = async () => {
  try {
    const {
      accessToken: { jwtToken },
    } = await Auth.currentSession();
    return jwtToken;
  } catch (error) {
    throw new Error('You must be signed in to access this feature.');
  }
};
