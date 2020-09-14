import React from 'react';
import T from 'prop-types';

import {
  AttemptButton,
  PullRequestButton,
  WatchIssueButton,
} from 'components/base_ui';

import { ButtonBar } from './styledComponents';

const IssueButtonBar = ({
  activeUser,
  activeUser: {
    id: userId,
    isGithubVerified,
    pullRequests: activeUserPullRequests,
    watching: activeUserWatching,
  },
  addWatching,
  data: { attempting, id: issueId, open, pullRequests, watching },
  dispatchFetchAttemptList,
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleIncrement,
  isSignedIn,
  ...restProps
}) => {
  const userWatching =
    activeUserWatching && !!activeUserWatching.find(el => el.id === issueId);

  return (
    <ButtonBar {...restProps}>
      <AttemptButton
        activeUser={activeUser}
        attempting={attempting}
        disabled={!open}
        dispatchFetchAttemptList={dispatchFetchAttemptList}
        dispatchOpenModal={dispatchOpenModal}
        handleIncrement={handleIncrement}
        isSignedIn={isSignedIn}
        issueId={issueId}
        userId={userId}
      />

      <WatchIssueButton
        disabled={!open}
        dispatchFetchWatchList={dispatchFetchWatchList}
        dispatchOpenModal={dispatchOpenModal}
        handleWatch={() =>
          addWatching({
            issueId,
            userId,
          })
        }
        isSignedIn={isSignedIn}
        issueId={issueId}
        label={userWatching ? 'Watching' : 'Watch'}
        value={watching.length}
      />
      <PullRequestButton
        activeUserPullRequests={activeUserPullRequests}
        disabled={!open}
        dispatchFetchPullRequestList={dispatchFetchPullRequestList}
        dispatchOpenIssueModal={dispatchOpenIssueModal}
        dispatchOpenModal={dispatchOpenModal}
        isGithubVerified={isGithubVerified}
        isSignedIn={isSignedIn}
        pullRequests={pullRequests}
      />
    </ButtonBar>
  );
};

IssueButtonBar.propTypes = {
  activeUser: T.object,
  addWatching: T.func,
  data: T.object,
  dispatchFetchAttemptList: T.func.isRequired,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func.isRequired,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
};

export default IssueButtonBar;
