const { checkDuplicateOrganization } = require('../../../db');
const { CustomError } = require('../../../helpers');

const checkDuplicate = async repo => {
  if (await checkDuplicateOrganization({ repo }))
    throw new CustomError(existingOrganizationError);
};

const createRepoError = `Something went wrong when creating the repo.`;

const createRepoSuccess = `Repo was successfully added.`;

const existingOrganizationError = `This organization already exists.`;

const getOrganizationsError = `Something went wrong when getting organizations.`;

const importRepoError = `Something went wrong when importing this repo.`;

const oneRepoError = `Something went wrong when getting this repo.`;

const transformRepoError = `Something went wrong when editing this repo.`;

const transformRepoSuccess = `Your repo was successfully edited.`;

module.exports = {
  checkDuplicate,
  createRepoError,
  createRepoSuccess,
  getOrganizationsError,
  importRepoError,
  oneRepoError,
  transformRepoError,
  transformRepoSuccess,
};
