import React from 'react';
import T from 'prop-types';

import {
  AttemptButton,
  PullRequestButton,
  WatchIssueButton,
} from 'components/base_ui';

import { ButtonBar } from './styledComponents';

const IssueStatusBar = ({
  activeUser,
  activeUser: { id: userId },
  data: { attempting, id, open, watching },
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleIncrement,
  isSignedIn,
  ...restProps
}) => {
  const userWatching =
    activeUser.watching && !!activeUser.watching.find(el => el.id === id);
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
        disabled={!open}
        dispatchOpenModal={dispatchOpenModal}
        isSignedIn={isSignedIn}
        pullRequests={[]}
      />
    </ButtonBar>
  );
};

IssueStatusBar.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
};

export default IssueStatusBar;
