const { mapValues } = require('../db/query');
const { formatParamaters } = require('./helpers');

const withdrawalValues = [
  'id',
  'created_date',
  'fee',
  'transfer_value',
  'user_id',
];

// CREATE single withdrawal
const createWithdrawal = async data => {
  const { parameters, substitution, values } = formatParamaters(
    withdrawalValues,
    data,
  );

  const queryText = `
    INSERT INTO withdrawal(${parameters})
    VALUES(${substitution})`;

  await mapValues(queryText, values);
  return 'Successfully created withdrawal';
};

// PATCH single user balance
const transformUserBalance = async ({ adjustedBalanceValue, userId }) => {
  const values = [[adjustedBalanceValue, userId]];

  const queryText = `
    UPDATE users
    SET balance = $1
    WHERE (id = $2)
    RETURNING balance`;

  const [result] = await mapValues(queryText, values);
  return result;
};

module.exports = { createWithdrawal, transformUserBalance };
