import React, { Fragment } from 'react';
import T from 'prop-types';

import { FundIssueButton, FundingWrapper } from 'components/base_ui';

import {
  IssueBarBottomRow,
  IssueBarTopRow,
  StyledIssueButtonBar,
  StyledIssueHeader,
} from './styledComponents';

const IssueTopBar = ({
  activeUser,
  addWatching,
  data,
  dispatchFetchAttemptList,
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleIncrement,
  isDesktop,
  isSignedIn,
}) => {
  const {
    fundedAmount,
    id: issueId,
    isInFundingQueue,
    isPullRequestMerged,
    isUserAccepted,
    open,
    rep,
  } = data;
  return (
    <Fragment>
      <StyledIssueHeader>
        <IssueBarTopRow>
          <FundingWrapper
            medium
            open={open}
            value={open ? 'Open Issue' : 'Issue Closed'}
          />
          {!isDesktop && (
            <FundIssueButton
              disabled={!open}
              dispatchOpenModal={dispatchOpenModal}
              fundedAmount={fundedAmount}
              isInFundingQueue={isInFundingQueue}
              isPullRequestMerged={isPullRequestMerged}
              issueId={issueId}
              isUserAccepted={isUserAccepted}
              open={open}
              rep={rep}
            />
          )}
        </IssueBarTopRow>

        <IssueBarBottomRow>
          <StyledIssueButtonBar
            activeUser={activeUser}
            addWatching={addWatching}
            data={data}
            dispatchFetchAttemptList={dispatchFetchAttemptList}
            dispatchFetchPullRequestList={dispatchFetchPullRequestList}
            dispatchFetchWatchList={dispatchFetchWatchList}
            dispatchOpenIssueModal={dispatchOpenIssueModal}
            dispatchOpenModal={dispatchOpenModal}
            handleIncrement={handleIncrement}
            isSignedIn={isSignedIn}
          />
        </IssueBarBottomRow>
      </StyledIssueHeader>
    </Fragment>
  );
};

IssueTopBar.propTypes = {
  activeUser: T.object,
  addWatching: T.func,
  data: T.object,
  dispatchFetchAttemptList: T.func,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isDesktop: T.bool,
  isSignedIn: T.bool,
};

export default IssueTopBar;
