const { checkDuplicateRepo } = require('../../../db');
const { CustomError } = require('../../../helpers');

const checkDuplicate = async repo => {
  if (await checkDuplicateRepo({ repo }))
    throw new CustomError(existingRepoError);
};

const createRepoError = `Something went wrong when creating the repo.`;

const createRepoSuccess = `Repo was successfully added.`;

const existingRepoError = `This repo already exists.`;

const getReposError = `Something went wrong when getting repos.`;

const importRepoError = `Something went wrong when importing this repo.`;

const oneRepoError = `Something went wrong when getting this repo.`;

const transformRepoError = `Something went wrong when editing this repo.`;

const transformRepoSuccess = `Your repo was successfully edited.`;

const typeOrganizationError = `Please select a repo within this organization to import.`;

module.exports = {
  checkDuplicate,
  createRepoError,
  createRepoSuccess,
  getReposError,
  importRepoError,
  oneRepoError,
  transformRepoError,
  transformRepoSuccess,
  typeOrganizationError,
};
