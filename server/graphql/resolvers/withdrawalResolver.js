const {
  createWithdrawal,
  getOneUser,
  transformUserBalance,
} = require('../../db');

module.exports = {
  createWithdrawal: async args => {
    const { fee, transferValue, userId } = args;
    try {
      const [{ balance }] = await getOneUser('users', userId);
      const adjustedBalanceValue = balance - transferValue;
      const [result] = await transformUserBalance(userId, adjustedBalanceValue);
      await createWithdrawal(userId, fee, transferValue);
      return {
        __typename: 'Withdrawal',
        ...result,
      };
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
};
