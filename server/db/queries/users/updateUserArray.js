const { singleItem, singleQuery } = require('../../baseQueries');

// @TODO: remove array functions when refactoring away arrays
const updateUserArray = async ({ column, data, remove, userId }) => {
  const [userData] = await singleItem('users', userId);
  // Only add unique values to array
  if (!userData[column].includes(data) || remove) {
    const action = remove ? 'array_remove' : 'array_append';
    const queryText = `UPDATE users
      SET ${column} = ${action}(${column}, '${data}')
      WHERE id = '${userId}'
      RETURNING *`;
    const { rows } = await singleQuery({ queryText });
    const [oneRow] = rows;
    return oneRow;
  }
  return false;
};

module.exports = updateUserArray;
