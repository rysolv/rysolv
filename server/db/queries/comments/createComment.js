const { commentValues } = require('./constants');
const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

// Create new Comment
const createComment = async data => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: commentValues,
  });

  const queryText = `INSERT INTO
  comments(${parameters})
  VALUES(${substitution})
  RETURNING *`;
  const { rows } = await singleQuery({ queryText, values });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = createComment;
