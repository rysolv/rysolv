const { formatParamaters } = require('../../helpers');
const { withdrawalValues } = require('./constants');
const { mapValues } = require('../../baseQueries');

// CREATE single withdrawal
const createWithdrawal = async data => {
  const { parameters, substitution, values } = formatParamaters(
    withdrawalValues,
    data,
  );

  const queryText = `
    INSERT INTO withdrawal(${parameters})
    VALUES(${substitution})`;

  await mapValues(queryText, [values]);
  return 'Successfully created withdrawal';
};

module.exports = createWithdrawal;
