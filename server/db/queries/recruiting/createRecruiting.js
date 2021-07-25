const { v4: uuidv4 } = require('uuid');
const { singleQuery } = require('../../baseQueries');

// Record a new activity
const recruitingSignup = async ({
  companyName,
  companyUrl,
  contactName,
  email,
}) => {
  const values = [
    uuidv4(),
    companyName,
    companyUrl,
    email,
    contactName,
    new Date(),
  ];

  const queryText = `
    INSERT INTO recruiting_signup(
      id,
      company_name,
      company_url,
      contact_email,
      contact_name,
      created_date
    )
    VALUES($1, $2, $3, $4, $5, $6)
  `;
  await singleQuery({ queryText, values });
};

module.exports = recruitingSignup;
