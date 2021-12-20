const { createUserTechStack, deleteUserTechStack } = require('../../../db');
const {
  CustomError,
  errorLogger,
  generatePositionLevel,
} = require('../../../helpers');
const {
  transformUserSkillsError,
  transformUserSkillsSuccess,
} = require('./constants');

const transformUserSkills = async ({ skillsArray }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    await deleteUserTechStack({ userId });

    await Promise.all(
      skillsArray.map(async ({ beginner, expert, intermediate, skill }) => {
        await createUserTechStack({
          level: generatePositionLevel({ beginner, expert, intermediate }),
          technology: skill,
          userId,
        });
      }),
    );

    return {
      __typename: 'Success',
      message: transformUserSkillsSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformUserSkillsError,
    };
  }
};

module.exports = transformUserSkills;
