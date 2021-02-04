const { CustomError, errorLogger } = require('../../../helpers');
const {
  getOneIssue,
  getOneOrganization,
  getOrganizationContributors,
} = require('../../../db');
const { oneOrganizationError } = require('./constants');

const oneOrganization = async ({ id }) => {
  try {
    const organizationDetail = await getOneOrganization({ organizationId: id });
    if (!organizationDetail) throw new CustomError(`Not found`);

    const { issues } = organizationDetail;

    const contributorsResult = await getOrganizationContributors({
      organizationId: id,
    });
    organizationDetail.contributors = contributorsResult;

    const issuesResult = await Promise.all(
      issues.map(async issueId => {
        const issueResult = await getOneIssue({ issueId });
        return issueResult;
      }),
    );
    organizationDetail.issues = issuesResult;

    return {
      __typename: 'Organization',
      ...organizationDetail,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || oneOrganizationError,
    };
  }
};

module.exports = oneOrganization;
