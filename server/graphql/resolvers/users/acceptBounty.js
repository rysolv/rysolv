const { errorLogger } = require('../../../helpers');
const { acceptBountyFailure, acceptBountySuccess } = require('./constants');
const { acceptBounty: acceptBountyQuery } = require('../../../db');

const acceptBounty = async ({ fundingId }) => {
  try {
    await acceptBountyQuery({ fundingId });
    return {
      __typename: 'Success',
      message: acceptBountySuccess,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: acceptBountyFailure,
    };
  }
};

module.exports = acceptBounty;
