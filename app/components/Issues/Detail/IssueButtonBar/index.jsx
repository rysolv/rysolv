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
    pullRequests: activeUserPullRequests,
    watching: activeUserWatching,
  },
  data: { attempting, id, open, pullRequests, watching },
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleIncrement,
  isSignedIn,
  ...restProps
}) => {
  const userWatching =
    activeUserWatching && !!activeUserWatching.find(el => el.id === id);
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
        issueId={id}
        userId={userId}
      />

      <WatchIssueButton
        disabled={!open}
        dispatchFetchWatchList={dispatchFetchWatchList}
        dispatchOpenModal={dispatchOpenModal}
        handleWatch={() =>
          handleIncrement({
            userId: activeUser.id,
            id,
            column: 'watching',
            remove: userWatching,
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
        isSignedIn={isSignedIn}
        pullRequests={pullRequests}
      />
    </ButtonBar>
  );
};

IssueButtonBar.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
};

export default IssueButtonBar;
