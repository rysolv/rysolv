const { singleQuery } = require('../../baseQueries');

// UPDATE balance of organization for payment
const submitAccountPaymentOrganization = async ({
  fundValue,
  organizationId,
}) => {
  const queryText = `UPDATE organizations SET total_funded=total_funded+${fundValue} WHERE (id = '${organizationId}')`;
  await singleQuery({ queryText });
};

module.exports = submitAccountPaymentOrganization;
