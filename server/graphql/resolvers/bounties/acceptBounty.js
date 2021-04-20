const { acceptBountyFailure, acceptBountySuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');
const {
  acceptBounty: acceptBountyQuery,
  verifyPayout,
} = require('../../../db');

const acceptBounty = async (
  { fundingId, userRatio },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    // Check if bounty exists and the repo has added a payout method
    const { fundedAmount, payoutUrl, userAccepted } = await verifyPayout({
      fundingId,
    });

    // User has already accepted bounty
    if (userAccepted) throw new CustomError('User already accepted bounty.');

    // If payout url, userRatio cannot exceed 90%
    if (payoutUrl && userRatio > 0.9)
      throw new CustomError('User ratio greater than 0.9.');

    // Max user ratio of 1
    if (!payoutUrl && userRatio > 1)
      throw new CustomError('User ratio greater than 1.');

    const userPayout = (fundedAmount * userRatio).toFixed(2);
    const repoPayout = (fundedAmount * (1 - userRatio)).toFixed(2);

    await acceptBountyQuery({ fundingId, userPayout, repoPayout });
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
