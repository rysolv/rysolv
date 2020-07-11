const { v4: uuidv4 } = require('uuid');

const {
  createWithdrawal,
  getOneUser,
  transformUserBalance,
} = require('../../db');

module.exports = {
  createWithdrawal: async args => {
    const { transferValue, userId } = args;
    console.log(transferValue);
    try {
      const [{ balance }] = await getOneUser(userId);
      const lessThanBalance = balance >= transferValue;
      const greaterThanZero = transferValue > 0;

      if (lessThanBalance && greaterThanZero) {
        // Update user balance
        const adjustedBalanceValue = balance - transferValue;
        const result = await transformUserBalance({
          userId,
          adjustedBalanceValue,
        });

        // Record new withdrawal
        const withdrawal = {
          created_date: new Date(),
          fee: transferValue * 0.15,
          id: uuidv4(),
          transfer_value: transferValue,
          user_id: userId,
        };
        await createWithdrawal(withdrawal);

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
