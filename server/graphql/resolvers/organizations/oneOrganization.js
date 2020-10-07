const { getOneIssue, getOneOrganization, getOneUser } = require('../../../db');
const { oneOrganizationError } = require('./constants');

const oneOrganization = async ({ id }) => {
  try {
    const result = await getOneOrganization({ organizationId: id });
    const { contributors, issues } = result;

    const contributorsResult = await Promise.all(
      contributors.map(async contributorId => {
        const userResult = await getOneUser({ userId: contributorId });
        return userResult;
      }),
    );
    result.contributors = contributorsResult;

    const issuesResult = await Promise.all(
      issues.map(async issueId => {
        const issueResult = await getOneIssue({ issueId });
        return issueResult;
      }),
    );
    result.issues = issuesResult;
    return {
      __typename: 'Organization',
      ...result,
    };
  } catch (error) {
    return {
      __typename: 'Error',
      message: oneOrganizationError,
    };
  }
};

module.exports = oneOrganization;
