const { singleQuery } = require('../../baseQueries');

// UPDATE balance of organization for payment
const submitAccountPaymentOrganization = async ({
  fundValue,
  organizationId,
}) => {
  const queryText = `
    UPDATE organizations
    SET total_funded = total_funded + $1
    WHERE id = $2
  `;
  await singleQuery({ queryText, values: [fundValue, organizationId] });
};

module.exports = submitAccountPaymentOrganization;
