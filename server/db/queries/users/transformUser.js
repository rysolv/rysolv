const { formatParamaters } = require('../../helpers');
const { singleItem, mapValues } = require('../../baseQueries');
const { userValues, userReturnValues } = require('./constants');

// Transform single user
const transformUser = async (id, data) => {
  const [rows] = await singleItem('users', id, userValues);
  if (rows) {
    const { parameters, substitution, values } = formatParamaters(
      userValues,
      data,
    );
    const queryText = `UPDATE users
      SET (${parameters})
      = (${substitution})
      WHERE (id = '${id}')
      RETURNING ${userReturnValues}`;
    const [result] = await mapValues(queryText, [values]);
    return result;
  }
  throw new Error(`Failed to update users. ID not found in users`);
};

module.exports = transformUser;
