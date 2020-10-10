const { createActivity } = require('../activity');
const { transformIssue: transformIssueQuery } = require('../../../db');
const { transformIssueError, transformIssueSuccess } = require('./constants');

const transformIssue = async ({ issueId, issueInput }) => {
  try {
    const data = {
      attempting: issueInput.attempting,
      body: issueInput.body,
      contributor_id: issueInput.contributorId,
      funded_amount: issueInput.fundedAmount,
      language: issueInput.language,
      modified_date: new Date(), // update modified date
      name: issueInput.name,
      open: issueInput.open,
      organization_id: issueInput.organizationId,
      rep: issueInput.rep,
      repo: issueInput.repo,
      type: issueInput.type,
    };
    const result = await transformIssueQuery({ data, issueId });

    const activityInput = {
      actionType: 'update',
      issueId: result.id,
      queryResult: result.organizationId,
      userId: result.contributorId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Success',
      message: transformIssueSuccess,
    };
  } catch (error) {
    const { message } = error;
    return {
      __typename: 'Error',
      message: message || transformIssueError,
    };
  }
};

module.exports = transformIssue;
