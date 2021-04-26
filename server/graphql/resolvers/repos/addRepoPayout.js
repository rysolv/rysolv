const { createActivity } = require('../activity');
const {
  CustomError,
  errorLogger,
  validatePayoutUrl,
} = require('../../../helpers');
const { transformRepo: transformRepoQuery } = require('../../../db');
const { transformRepoError, transformRepoSuccess } = require('./constants');

const addRepoPayout = async ({ repoId, repoInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { payoutMethod, payoutUrl } = repoInput;
    validatePayoutUrl({ payoutMethod, payoutUrl });

    const data = {
      modified_date: new Date(),
      payout_url: payoutUrl,
    };
    const result = await transformRepoQuery({ data, repoId });

    const activityInput = {
      actionType: 'update',
      repoId: result.id,
      userId: result.ownerId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: transformRepoSuccess,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || transformRepoError,
    };
  }
};

module.exports = addRepoPayout;
