const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

const recruitingSignup = async ({
  companyName,
  companyUrl,
  contactName,
  email,
}) => {
  const values = [
    companyName,
    companyUrl,
    email,
    contactName,
    new Date(),
    uuidv4(),
  ];

  const queryText = `
    INSERT INTO recruiting_signup(
      company_name,
      company_url,
      contact_email,
      contact_name,
      created_date,
      id
    )
    VALUES($1, $2, $3, $4, $5, $6)
  `;
  await singleQuery({ queryText, values });
};

module.exports = recruitingSignup;
