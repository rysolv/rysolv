const { CustomError, errorLogger } = require('../../../helpers');
const {
  getCompanyPositions: getCompanyPositionsQuery,
} = require('../../../db');

const getCompanyPositions = async ({ companyId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const positions = await getCompanyPositionsQuery({ companyId });
    const formattedPositions = positions.map(
      ({ location, positionId, positionData }) => ({
        id: positionId,
        isActive: positionData.is_active,
        isRemote: positionData.is_remote,
        location: location.replace(/[0-9]/g, '').replace(' ,', ','),
        title: positionData.title,
      }),
    );
    return {
      __typename: 'CompanyPositionsArray',
      positions: formattedPositions,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'CompanyPositionsArray',
      positions: [],
    };
  }
};

module.exports = getCompanyPositions;
