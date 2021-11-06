const { updateCompany } = require('../../../db');
const { createCompanyError, createCompanySuccess } = require('./constants');
const {
  CustomError,
  errorLogger,
  generateSizeInteger,
} = require('../../../helpers');

const createCompany = async ({ companyInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);
    const {
      companyId,
      description,
      location,
      name,
      size,
      website,
    } = companyInput;
    const companyData = {
      company_name: name,
      company_url: website,
      created_date: new Date(),
      description,
      id: companyId,
      location,
      size: generateSizeInteger(size),
    };
    await updateCompany({ ...companyData });

    return {
      __typename: 'Success',
      message: createCompanySuccess,
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
