const { transformIssue: transformIssueQuery } = require('../../../db');
const { createActivity } = require('../activity');

const transformIssue = async args => {
  const { issueId, issueInput } = args;
  try {
    const data = {
      attempting: issueInput.attempting,
      body: issueInput.body,
      comments: issueInput.comments,
      contributor_id: issueInput.contributorId,
      funded_amount: issueInput.fundedAmount,
      language: issueInput.language,
      modified_date: new Date(), // update modified date
      name: issueInput.name,
      open: issueInput.open,
      organization_id: issueInput.organizationId,
      rep: issueInput.rep,
      repo: issueInput.repo,
    };
    const result = await transformIssueQuery({ data, issueId });

    const activityInput = {
      actionType: 'update',
      queryResult: result.organizationId,
      issueId: result.id,
      userId: result.contributorId,
    };
    await createActivity({ activityInput });

    return {
      __typename: 'Issue',
      ...result,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = transformIssue;
