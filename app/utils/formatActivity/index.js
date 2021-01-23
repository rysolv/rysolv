/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import iconDictionary from 'utils/iconDictionary';

import {
  StyledAddIcon,
  StyledPullRequestIcon,
  StyledRemoveIcon,
  StyledCommentIcon,
} from './styledComponents';

const AddIcon = iconDictionary('addCircle');
const AttemptIcon = iconDictionary('attempt');
const CancelIcon = iconDictionary('cancel');
const CommentIcon = iconDictionary('comments');
const Edit = iconDictionary('edit');
const FundedIcon = iconDictionary('funded');
const GiftIcon = iconDictionary('gift');
const PullRequestIcon = iconDictionary('pullRequest');
const SuccessIcon = iconDictionary('successOutline');
const WatchIcon = iconDictionary('monocle');

const AddAttempting = <StyledAddIcon>{AttemptIcon}</StyledAddIcon>;
const AddComment = <StyledCommentIcon>{CommentIcon}</StyledCommentIcon>;
const AddWatching = <StyledAddIcon>{WatchIcon}</StyledAddIcon>;
const Created = <StyledAddIcon>{AddIcon}</StyledAddIcon>;
const Deleted = <StyledRemoveIcon>{CancelIcon}</StyledRemoveIcon>;
const Earned = <StyledAddIcon>{GiftIcon}</StyledAddIcon>;
const Edited = <StyledAddIcon>{Edit}</StyledAddIcon>;
const Funded = <StyledAddIcon>{FundedIcon}</StyledAddIcon>;
const PullRequest = (
  <StyledPullRequestIcon>{PullRequestIcon}</StyledPullRequestIcon>
);
const RemoveAttempting = <StyledRemoveIcon>{AttemptIcon}</StyledRemoveIcon>;
const RemoveWatching = <StyledRemoveIcon>{WatchIcon}</StyledRemoveIcon>;
const Resolved = <StyledAddIcon>{SuccessIcon}</StyledAddIcon>;

export const formatActivity = data => {
  const {
    actionType,
    activityId,
    createdDate,
    fundedValue,
    issueId,
    issueName,
    organizationId,
    organizationName,
    profilePic,
    pullRequestId,
    pullRequestName,
    pullRequestUrl,
    userId,
    username,
  } = data;

  const actionDictionary = {
    add_attempting: { action: 'started attempting', icon: AddAttempting },
    add_watching: { action: 'started watching', icon: AddWatching },
    close: { action: 'closed', icon: Deleted },
    comment: { action: 'commented on', icon: AddComment },
    create: { action: 'created', icon: Created },
    delete: { action: 'deleted', icon: Deleted },
    earn: { action: 'earned a bounty', icon: Earned },
    fund: { action: 'funded', icon: Funded },
    open_pr: { action: 'opened pull request', icon: PullRequest },
    remove_attempting: { action: 'stopped attempting', icon: RemoveAttempting },
    remove_watching: { action: 'stopped watching', icon: RemoveWatching },
    reopen: { action: 'reopened', icon: Created },
    resolve: { action: 'resolved', icon: Resolved },
    update: { action: 'updated', icon: Edited },
  };

  const { action, icon } = actionDictionary[actionType];
  const targetType = pullRequestId
    ? 'pull request'
    : issueId
    ? 'issue'
    : organizationId
    ? 'organization'
    : userId
    ? 'account with'
    : null;

  const route = issueId
    ? 'issues'
    : organizationId
    ? 'organizations'
    : 'pullrequests';

  const targetId = pullRequestId || issueId || organizationId;

  const isInternalLink = !pullRequestId;
  const path = pullRequestId ? pullRequestUrl : `/${route}/detail/${targetId}`;

  const targetName = pullRequestName || issueName || organizationName;

  const formattedActivity = {
    action,
    activityId,
    date: createdDate,
    fundedValue,
    icon,
    isInternalLink,
    path,
    target: {
      targetId,
      targetName,
      targetType,
    },
    user: {
      profilePic,
      userId,
      username,
    },
  };

  return formattedActivity;
};
