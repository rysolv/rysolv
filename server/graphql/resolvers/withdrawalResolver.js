const { v4: uuidv4 } = require('uuid');

const {
  createWithdrawal,
  getOneUser,
  transformUserBalance,
} = require('../../db');

module.exports = {
  createWithdrawal: async args => {
    const { transferValue, userId } = args;
    try {
      const [{ balance }] = await getOneUser('users', userId);
      const lessThanBalance = balance >= transferValue;
      const greaterThanZero = transferValue > 0;
      if (lessThanBalance && greaterThanZero) {
        const adjustedBalanceValue = balance - transferValue;
        const fee = transferValue * 0.15;
        const withdrawalId = uuidv4();
        const [result] = await transformUserBalance(
          userId,
          adjustedBalanceValue,
        );
        await createWithdrawal(userId, withdrawalId, fee, transferValue);
        return {
          __typename: 'Withdrawal',
          ...result,
        };
      }
      return {
        __typename: 'Error',
        message: lessThanBalance
          ? 'Transfer amount is greater than balance.'
          : 'Transfer amount must be greater than $0.00.',
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
