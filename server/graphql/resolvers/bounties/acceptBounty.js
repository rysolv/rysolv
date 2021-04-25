const {
  acceptBounty: acceptBountyQuery,
  verifyPayout,
} = require('../../../db');
const { acceptBountyError, acceptBountySuccess } = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

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
    if (userAccepted)
      throw new CustomError(`You have already accepted this bounty.`);

    // If payout url, userRatio cannot exceed 90%
    if (fundedAmount > 0 && payoutUrl && userRatio > 0.9)
      throw new CustomError(`Your portion of the bounty cannot exceed 90%.`);

    // Max user ratio of 1
    if (!payoutUrl && userRatio > 1)
      throw new CustomError(`Your portion of the bounty cannot exceed 100%.`);

    const repoPayout = (fundedAmount * (1 - userRatio)).toFixed(2);
    const userPayout = (fundedAmount * userRatio).toFixed(2);

    await acceptBountyQuery({ fundingId, repoPayout, userPayout });
    return {
      __typename: 'Success',
      message: acceptBountySuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || acceptBountyError,
    };
  }
};

module.exports = acceptBounty;
