/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import moment from 'moment';
import iconDictionary from 'utils/iconDictionary';

import { StyledAddIcon, StyledRemoveIcon } from './styledComponents';

const AddIcon = iconDictionary('addCircle');
const CancelIcon = iconDictionary('cancel');
const SuccessIcon = iconDictionary('successOutline');
const CommentIcon = iconDictionary('comments');
const FundedIcon = iconDictionary('funded');
const Edit = iconDictionary('edit');
const GiftIcon = iconDictionary('gift');
const AttemptIcon = iconDictionary('attempt');
const PullRequestIcon = iconDictionary('pullRequest');
const WatchIcon = iconDictionary('monocle');

const AddWatching = <StyledAddIcon>{WatchIcon}</StyledAddIcon>;
const RemoveWatching = <StyledRemoveIcon>{WatchIcon}</StyledRemoveIcon>;
const AddAttempting = <StyledAddIcon>{AttemptIcon}</StyledAddIcon>;
const RemoveAttempting = <StyledRemoveIcon>{AttemptIcon}</StyledRemoveIcon>;
const Created = <StyledAddIcon>{AddIcon}</StyledAddIcon>;
const Deleted = <StyledRemoveIcon>{CancelIcon}</StyledRemoveIcon>;
const AddComment = <StyledAddIcon>{CommentIcon}</StyledAddIcon>;
const Edited = <StyledAddIcon>{Edit}</StyledAddIcon>;
const Resolved = <StyledAddIcon>{SuccessIcon}</StyledAddIcon>;
const PullRequest = <StyledAddIcon>{PullRequestIcon}</StyledAddIcon>;
const Funded = <StyledAddIcon>{FundedIcon}</StyledAddIcon>;
const Earned = <StyledAddIcon>{GiftIcon}</StyledAddIcon>;

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
    add_attempting: { action: 'attemped issue', icon: AddAttempting },
    add_watching: { action: 'started watching', icon: AddWatching },
    close: { action: 'closed issue', icon: Deleted },
    comment: { action: 'commented on an', icon: AddComment },
    create: { action: 'created', icon: Created },
    delete: { action: 'deleted', icon: Deleted },
    earn: { action: 'earned', icon: Earned },
    fund: { action: 'funded', icon: Funded },
    open_pr: { action: 'opened pull request', icon: PullRequest },
    remove_attempting: { action: 'stopped attempting', icon: RemoveAttempting },
    remove_watching: { action: 'stopped watching', icon: RemoveWatching },
    resolve: { action: 'resolved', icon: Resolved },
    update: { action: 'updated', icon: Edited },
  };

  const { action, icon } = actionDictionary[actionType];
  const targetType = issueId
    ? 'Issue'
    : organizationId
    ? 'Organization'
    : 'Pull Request';

  const route = issueId
    ? 'issues'
    : organizationId
    ? 'organizations'
    : 'pullrequests';

  const targetId = issueId || organizationId || pullRequestId;

  const path = `/${route}/detail/${targetId}`;

  const targetName = issueName || organizationName;
  const formattedDate = moment(createdDate).format('YYYY/MM/DD');

  const formattedActivity = {
    action,
    activityId,
    date: formattedDate,
    fundedValue,
    icon,
    path,
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
