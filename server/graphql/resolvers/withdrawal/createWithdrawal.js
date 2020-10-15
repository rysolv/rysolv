/* eslint-disable consistent-return */
const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('../activity');
const {
  createWithdrawal: createWithdrawalQuery,
  getUserSettings,
  transformUserBalance,
} = require('../../../db');
const {
  createWithdrawalError,
  createWithdrawalSuccess,
  greaterThanZeroError,
  lessThanBalanceError,
} = require('./constants');

const createWithdrawal = async (
  { email, transferValue },
  { authError, userId },
) => {
  try {
    if (authError || !userId) throw new Error(authError);

    const { balance } = await getUserSettings({ userId });
    const createdDate = new Date();
    const lessThanBalance = balance >= transferValue;
    const greaterThanZero = transferValue > 0;

    if (lessThanBalance && greaterThanZero) {
      // Update user balance
      const adjustedBalanceValue = balance - transferValue;
      const result = await transformUserBalance({
        adjustedBalanceValue,
        userId,
      });

      // Record new withdrawal
      const data = {
        created_date: createdDate,
        email,
        fee: transferValue * 0.15,
        id: uuidv4(),
        transfer_value: transferValue,
        user_id: userId,
      };
      await createWithdrawalQuery({ data });

      // Record withdrawal activity
      const activityInput = {
        actionType: 'withdraw',
        createdDate,
        fundedValue: transferValue,
        isPrivate: true,
        userId,
      };
      await createActivity({ activityInput });

      return {
        __typename: 'Withdrawal',
        message: createWithdrawalSuccess,
        ...result,
      };
    }
    if (!lessThanBalance && greaterThanZero) {
      const error = new Error();
      error.message = greaterThanZeroError;
      throw error;
    }
    if (lessThanBalance && !greaterThanZero) {
      const error = new Error();
      error.message = lessThanBalanceError;
      throw error;
    }
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || createWithdrawalError,
    };
  }
};

module.exports = createWithdrawal;
