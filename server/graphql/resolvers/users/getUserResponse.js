/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { getUserResponse: getUserResponseQuery } = require('../../../db');
const { getUserResponseError } = require('./constants');

const getUserResponse = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { userData, skills } = await getUserResponseQuery({ userId });
    const user = { ...userData, skills };
    const formattedUser = Object.keys(user).reduce((acc, userItem) => {
      if (userItem === 'skills') {
        if (user[userItem]) {
          const skillsArray = user[userItem].map(({ level, shortName }) => ({
            beginner: level === 1,
            expert: level === 3,
            intermediate: level === 2,
            skill: shortName,
          }));
          acc.skills = skillsArray;
        } else {
          acc.skills = [];
        }
      } else acc[userItem] = user[userItem];
      return acc;
    }, {});
    return {
      __typename: 'User',
      ...formattedUser,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserResponseError,
    };
  }
};

module.exports = getUserResponse;
