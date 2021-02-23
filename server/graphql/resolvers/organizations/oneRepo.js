const { CustomError, errorLogger } = require('../../../helpers');
const { getOneIssue, getOneRepo, getRepoContributors } = require('../../../db');
const { oneRepoError } = require('./constants');

const oneRepo = async ({ id }) => {
  try {
    const repoDetail = await getOneRepo({ repoId: id });
    if (!repoDetail) throw new CustomError(`Not found`);

    const { issues } = repoDetail;

    const contributorsResult = await getRepoContributors({
      repoId: id,
    });
    repoDetail.contributors = contributorsResult;

    const issuesResult = await Promise.all(
      issues.map(async issueId => {
        const issueResult = await getOneIssue({ issueId });
        return issueResult;
      }),
    );
    const filteredIssues = issuesResult.filter(issue => issue);
    repoDetail.issues = filteredIssues;

    return {
      __typename: 'Repo',
      ...repoDetail,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || oneRepoError,
    };
  }
};

module.exports = oneRepo;
