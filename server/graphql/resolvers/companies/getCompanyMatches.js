const { CustomError, errorLogger } = require('../../../helpers');
const { getCompanyPositions } = require('../../../db');

const getCompanyMatches = async ({ companyId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getCompanyPositions({ companyId });
    // eslint-disable-next-line no-param-reassign, no-return-assign
    result.map(el => (el.candidates = []));
    return {
      __typename: 'CompanyMatchesArray',
      companyMatchesArray: result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'CompanyMatchesArray',
      companyMatchesArray: [],
    };
  }
};

module.exports = getCompanyMatches;
