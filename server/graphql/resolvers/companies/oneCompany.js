/* eslint-disable camelcase */
const { errorLogger } = require('../../../helpers');
const { generateSizeString } = require('../../../helpers');
const { getOneCompany } = require('../../../db');
const { oneCompanyError } = require('./constants');

const oneCompany = async ({ companyId }) => {
  try {
    const companyData = await getOneCompany({ companyId });
    const { size } = companyData;
    const formattedSize = generateSizeString({ size });

    return {
      __typename: 'Company',
      ...companyData,
      size: formattedSize,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: oneCompanyError,
    };
  }
};

module.exports = oneCompany;
