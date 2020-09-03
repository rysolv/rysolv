const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');
const { withdrawalValues } = require('./constants');

// CREATE single withdrawal
const createWithdrawal = async data => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: withdrawalValues,
  });
  const queryText = `
    INSERT INTO withdrawal(${parameters})
    VALUES(${substitution})
  `;
  await singleQuery({ queryText, values });
  return 'Successfully created withdrawal';
};

module.exports = createWithdrawal;
