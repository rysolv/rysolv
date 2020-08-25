const { formatParamaters } = require('../../helpers');
const { mapValues } = require('../../baseQueries');
const { userValues } = require('./constants');

// Create new User
const createUser = async data => {
  const { parameters, substitution, values } = formatParamaters(
    userValues,
    data,
  );
  const queryText = `INSERT INTO
    users( ${parameters} )
    VALUES(${substitution})
    RETURNING *`;
  const [result] = await mapValues(queryText, [values]);
  return result;
};

module.exports = createUser;
