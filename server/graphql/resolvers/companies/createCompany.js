const { v4: uuidv4 } = require('uuid');

const {
  createCompany: createCompanyQuery,
  insertUserCompany,
} = require('../../../db');
const { createCompanyError } = require('./constants');
const {
  CustomError,
  errorLogger,
  generateSizeInteger,
} = require('../../../helpers');

const createCompany = async ({ companyInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const { description, location, name, size, website } = companyInput;
    const companyId = uuidv4();
    const companyData = {
      company_name: name,
      company_url: website,
      created_date: new Date(),
      description,
      id: companyId,
      location,
      size: generateSizeInteger(size),
    };
    await createCompanyQuery({ data: companyData });

    const userCompanyValues = [companyId, uuidv4(), userId];
    await insertUserCompany({ values: userCompanyValues });

    return {
      __typename: 'Company',
      companyId,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createCompanyError,
    };
  }
};

module.exports = createCompany;
