const { formatParameters } = require('../../helpers');
const { messageValues } = require('./constants');
const { singleQuery } = require('../../baseQueries');

const createMessage = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: messageValues,
  });

  const queryText = `
    INSERT INTO
    messages(${parameters})
    VALUES(${substitution})
  `;
  await singleQuery({ queryText, values });
};

module.exports = createMessage;
