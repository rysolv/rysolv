/* eslint-disable camelcase */
const {
  CustomError,
  errorLogger,
  formatToCamelCase,
} = require('../../../helpers');
const { getUserResponse: getUserResponseQuery } = require('../../../db');
const { getUserResponseError } = require('./constants');
const { retrieveFile } = require('../../../middlewares/fileUpload');

const getUserResponse = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { desiredRole, skills, userData } = await getUserResponseQuery({
      userId,
    });
    const user = { ...userData, skills };
    const formattedUser = {};
    await Promise.all(
      Object.keys(user).map(async userItem => {
        if (userItem === 'skills') {
          if (user[userItem]) {
            const skillsArray = user[userItem].map(({ level, shortName }) => ({
              beginner: level === 1,
              expert: level === 3,
              intermediate: level === 2,
              skill: shortName,
            }));
            formattedUser.skills = skillsArray;
          } else {
            formattedUser.skills = [];
          }
        } else if (userItem === 'resume') {
          const pathArray = user[userItem].split('/');
          const key = pathArray
            .slice(1)
            .slice(-2)
            .join('/');
          const { contentType, file } = await retrieveFile({ key });
          formattedUser.resume = `data:${contentType};base64,${file}`;
        } else formattedUser[formatToCamelCase(userItem)] = user[userItem];
      }),
    );
    return {
      __typename: 'User',
      ...formattedUser,
      desiredRole,
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
