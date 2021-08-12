const { activityValues } = require('./constants');
const { formatParameters } = require('../../helpers');
const { singleQuery } = require('../../baseQueries');

// Record a new activity
const createActivity = async ({ data }) => {
  const { parameters, substitution, values } = formatParameters({
    newObject: data,
    tableParameters: activityValues,
  });
  const queryText = `INSERT INTO
    activity(${parameters})
    VALUES(${substitution})`;
  await singleQuery({ queryText, values });
};

module.exports = createActivity;
