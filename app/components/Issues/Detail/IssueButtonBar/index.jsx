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
        dispatchFetchWatchList={dispatchFetchWatchList}
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
        label={userWatching ? 'Watching' : 'Watch'}
        value={watching.length}
        watching={watching}
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
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
};

export default IssueButtonBar;
