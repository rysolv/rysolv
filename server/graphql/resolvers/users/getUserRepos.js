/* eslint-disable no-param-reassign */
const { CustomError, errorLogger } = require('../../../helpers');
const { getOrganizationList, getUserSettings } = require('../../../db');
const { getUserGithubRepos } = require('../../../integrations');
const { githubNotVerifiedError } = require('./constants');

const getUserRepos = async (_, { authError, userId }) => {
  if (authError) throw new CustomError(authError);

  try {
    const { githubUsername, isGithubVerified } = await getUserSettings({
      userId,
    });

    if (isGithubVerified) {
      const organizationList = await getOrganizationList();

      const userOrganizations = await getUserGithubRepos({
        username: githubUsername,
      });

      const organizations = userOrganizations.map(organization => {
        const parentArray = organization.organizationUrl.split('/');
        parentArray.pop();
        const parentUrl = parentArray.join('/');

        if (
          organizationList &&
          (organizationList.includes(organization.organizationUrl) ||
            organizationList.includes(parentUrl))
        ) {
          organization.exists = true;
          return organization;
        }
        organization.exists = false;
        return organization;
      });

      return {
        __typename: 'OrganizationArray',
        organizations,
      };
    }
    throw new CustomError(githubNotVerifiedError);
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert,
    };
  }
};

module.exports = getUserRepos;
