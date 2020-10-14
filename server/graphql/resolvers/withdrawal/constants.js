const createWithdrawalError = `Something went wrong with the withdrawal from your Rysolv account.`;

const createWithdrawalSuccess = `Withdrawal request has been successfully submitted.`;

const greaterThanZeroError = `Transfer amount must be less than or equal to your current balance.`;

const lessThanBalanceError = `Transfer amount must be greater than $0.00.`;

module.exports = {
  createWithdrawalError,
  createWithdrawalSuccess,
  greaterThanZeroError,
  lessThanBalanceError,
};
