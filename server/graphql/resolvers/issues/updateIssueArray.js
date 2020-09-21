const { createActivity } = require('../activity');
const { updateIssueArray: updateIssueArrayQuery } = require('../../../db');

const updateIssueArray = async ({
  id: issueId,
  column,
  data: userId,
  remove,
}) => {
  const result = await updateIssueArrayQuery({
    column,
    data: userId,
    issueId,
    remove,
  });

  const activityInput = {
    actionType: remove ? `remove_${column}` : `add_${column}`,
    issueId,
    organizationId: result.organization_id,
    userId,
  };
  await createActivity({ activityInput });

  return result;
};

module.exports = updateIssueArray;
