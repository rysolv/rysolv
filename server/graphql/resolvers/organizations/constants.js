const { checkDuplicateOrganization } = require('../../../db');

const checkDuplicate = async repo => {
  if (await checkDuplicateOrganization({ repo })) {
    throw new Error(`An organization at ${repo} already exists`);
  }
};

module.exports = { checkDuplicate };
