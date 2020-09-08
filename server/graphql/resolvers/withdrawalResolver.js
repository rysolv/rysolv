const { v4: uuidv4 } = require('uuid');

const { createActivity } = require('./activityResolver');
const {
  createWithdrawal,
  getOneUser,
  transformUserBalance,
} = require('../../db');

module.exports = {
  createWithdrawal: async args => {
    const { transferValue, userId } = args;
    try {
      const { balance } = await getOneUser({ userId });
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
          fee: transferValue * 0.15,
          id: uuidv4(),
          transfer_value: transferValue,
          user_id: userId,
        };
        await createWithdrawal({ data });

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
          ...result,
        };
      }

      throw new Error(
        lessThanBalance
          ? 'Transfer amount is greater than balance.'
          : 'Transfer amount must be greater than $0.00.',
      );
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
