const { checkDuplicateOrganization } = require('../../../db');

const checkDuplicate = async repo => {
  if (await checkDuplicateOrganization({ repo })) {
    const error = new Error();
    error.message = existingOrganizationError;
    throw error;
  }
};

const createOrganizationError = `Something went wrong when creating the organization.`;

const createOrganizationSuccess = `Organization was successfully added.`;

const existingOrganizationError = `This organization already exists.`;

const getOrganizationsError = `Something went wrong when getting organizations.`;

const importOrganizationError = `Something went wrong when importing this organization.`;

module.exports = {
  checkDuplicate,
  createOrganizationError,
  createOrganizationSuccess,
  getOrganizationsError,
  importOrganizationError,
};
