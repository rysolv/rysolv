/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { getOnePosition } = require('../../../db');
const { onePositionError } = require('./constants');

const onePosition = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { location, positionData, role, skills } = await getOnePosition({
      positionId,
    });
    const position = { ...positionData, location, skills, role };
    const formattedPosition = Object.keys(position).reduce(
      (acc, positionItem) => {
        if (positionItem === 'is_active') acc.isActive = position[positionItem];
        else if (positionItem === 'skills') {
          if (position[positionItem]) {
            const skillsArray = position[positionItem].map(
              ({ level, name }) => ({
                beginner: level === 1,
                expert: level === 3,
                intermediate: level === 2,
                skill: name,
              }),
            );
            acc.skills = skillsArray;
          } else {
            acc.skills = [];
          }
        } else acc[positionItem] = position[positionItem];
        return acc;
      },
      {},
    );
    return {
      __typename: 'Position',
      ...formattedPosition,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: onePositionError,
    };
  }
};

module.exports = onePosition;
