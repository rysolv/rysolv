const { updateUserArray: updateUserArrayQuery } = require('../../../db');

const updateUserArray = async args => {
  const { column, data, id, remove } = args;
  try {
    const [result] = await updateUserArrayQuery({
      column,
      data,
      remove,
      userId: id,
    });
    return result;
  } catch (error) {
    throw new Error('Too many requests.');
  }
};

module.exports = updateUserArray;
