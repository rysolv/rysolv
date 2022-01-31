/* eslint-disable camelcase */
const { errorLogger } = require('../../../helpers');
const { getUserProfile: getUserProfileQuery } = require('../../../db');
const { userProfileError } = require('./constants');

const getUserProfile = async ({ username }, { userId }) => {
  try {
    const {
      chartData,
      desiredRole,
      questionResponses,
      skills,
      userData,
    } = await getUserProfileQuery({
      username,
    });

    // Create user profile object
    const userProfile = {
      ...userData,
      chartData,
      desiredRole,
      hiringStatus: 'undeclared',
      skills,
      username,
    };

    // Add title and about to user profile
    if (questionResponses) {
      const { about, is_active, title } = questionResponses;
      userProfile.about = about || null;
      userProfile.title = title || null;

      // Set hiring status
      if (is_active === 'yes_is_active') {
        userProfile.hiringStatus = 'active';
      } else if (is_active === 'no_is_active') {
        userProfile.hiringStatus = 'inactive';
      }
    }

    if (userId && userId === userProfile.id) {
      userProfile.isSignedIn = true;
    }

    return {
      __typename: 'User',
      ...userProfile,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: userProfileError,
    };
  }
};

module.exports = getUserProfile;
