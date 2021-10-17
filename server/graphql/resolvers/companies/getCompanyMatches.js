const { CustomError, errorLogger } = require('../../../helpers');
const { getCompanyPositions } = require('../../../db');

const getCompanyMatches = async ({ companyId }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getCompanyPositions({ companyId });
    /* eslint-disable array-callback-return, no-param-reassign */
    result.map(el => {
      el.position.isRemote = el.position.isRemote === 'yes_is_remote';
      el.position.location = el.position.location
        .replace(/[0-9]/g, '')
        .replace(' ,', ',');
      el.candidates = [];
    });
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
