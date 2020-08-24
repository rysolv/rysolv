const { activityValues } = require('./constants');
const { formatParamaters } = require('../../helpers');
const { mapValues } = require('../../baseQueries');

// Record a new activity
const createActivity = async data => {
  const { parameters, substitution, values } = formatParamaters(
    activityValues,
    data,
  );
  const queryText = `INSERT INTO
    activity(${parameters})
    VALUES(${substitution})`;
  await mapValues(queryText, values);
  return 'Successfully logged activity';
};

module.exports = createActivity;
