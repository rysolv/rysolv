/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import iconDictionary from 'utils/iconDictionary';

const CancelIcon = iconDictionary('cancel');
const FundedIcon = iconDictionary('funded');
const GiftIcon = iconDictionary('gift');
const PullRequestIcon = iconDictionary('pullRequest');

export const formatActivity = prop => {
  const {
    activityId,
    createdDate,
    actionType,
    issueId,
    organizationId,
    organizationName,
    pullRequestId,
    userId,
    fundedValue,
    issueName,
    username,
  } = prop;

  const actionDictionary = {
    add_attempting: { action: 'attemped issue', icon: FundedIcon },
    add_watching: { action: 'started watching', icon: FundedIcon },
    close: { action: 'closed issue', icon: CancelIcon },
    comment: { action: 'commented', icon: FundedIcon },
    create: { action: 'created', icon: FundedIcon },
    delete: { action: 'deleted', icon: FundedIcon },
    earn: { action: 'earned', icon: GiftIcon },
    fund: { action: 'funded', icon: FundedIcon },
    open_pr: { action: 'opened pull request', icon: PullRequestIcon },
    remove_attempting: { action: 'stopped attempting', icon: FundedIcon },
    remove_watching: { action: 'stopped watching', icon: FundedIcon },
    resolve: { action: 'resolved', icon: FundedIcon },
    update: { action: 'updated', icon: FundedIcon },
  };

  const { action, icon } = actionDictionary[actionType];
  const targetType = issueId
    ? 'Issue'
    : organizationId
    ? 'Organization'
    : 'Pull Request';

  const targetId = issueId || organizationId || pullRequestId;
  const targetName = issueName || organizationName;

  const formattedActivity = {
    action,
    activityId,
    date: createdDate,
    fundedValue,
    icon,
    target: {
      targetId,
      targetName,
      targetType,
    },
    user: {
      userId,
      username,
    },
  };

  return formattedActivity;
};
