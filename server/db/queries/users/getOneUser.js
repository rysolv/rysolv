const { singleQuery } = require('../../baseQueries');
const { userReturnValues } = require('./constants');

// GET single user
const getOneUser = async ({ userId }) => {
  const queryText = `
    SELECT ${userReturnValues} from users
    WHERE id = $1 AND is_deleted = false
  `;
  const { rows } = await singleQuery({ queryText, values: [userId] });
  const [oneRow] = rows;
  if (oneRow) return oneRow;
  throw new Error(`User not found`);
};

module.exports = getOneUser;
