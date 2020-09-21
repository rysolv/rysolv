const { singleQuery } = require('../../baseQueries');
const { userSettingsReturnValues } = require('./constants');

// GET single user
const getOneUser = async ({ userId }) => {
  const queryText = `
    SELECT ${userSettingsReturnValues} from users
    WHERE id = $1 AND is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getOneUser;
