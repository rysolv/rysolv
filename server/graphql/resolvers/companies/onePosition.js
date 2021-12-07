/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { getOnePosition } = require('../../../db');
const { onePositionError } = require('./constants');

const onePosition = async ({ positionId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { positionData, skills, role } = await getOnePosition({ positionId });
    const position = { ...positionData, skills, role };
    const formattedPosition = Object.keys(position).reduce(
      (acc, positionItem) => {
        if (positionItem === 'is_open') acc.isOpen = position[positionItem];
        else if (positionItem === 'is_remote')
          acc.isRemote = position[positionItem];
        else if (positionItem === 'skills') {
          if (position[positionItem]) {
            const skillsArray = position[positionItem].map(
              ({ level, shortName }) => ({
                beginner: level === 1,
                expert: level === 3,
                intermediate: level === 2,
                skill: shortName,
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
      message: alert || onePositionError,
    };
  }
};

module.exports = onePosition;
