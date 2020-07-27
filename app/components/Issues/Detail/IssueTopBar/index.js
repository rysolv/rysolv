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
  data,
  dispatchFetchPullRequestList,
  dispatchFetchWatchList,
  dispatchOpenIssueModal,
  dispatchOpenModal,
  handleIncrement,
  isDesktop,
  isSignedIn,
}) => {
  const { balance, email, firstName, id: userId, lastName } = activeUser;
  const { fundedAmount, id: issueId, open, organizationId } = data;
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
              balance={balance}
              disabled={!open}
              dispatchOpenModal={dispatchOpenModal}
              email={email}
              firstName={firstName}
              fundedAmount={fundedAmount}
              issueId={issueId}
              lastName={lastName}
              open={open}
              organizationId={organizationId}
              userId={userId}
            />
          )}
        </IssueBarTopRow>

        <IssueBarBottomRow>
          <StyledIssueButtonBar
            activeUser={activeUser}
            data={data}
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
  data: T.object,
  dispatchFetchPullRequestList: T.func,
  dispatchFetchWatchList: T.func,
  dispatchOpenIssueModal: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isDesktop: T.bool,
  isSignedIn: T.bool,
};

export default IssueTopBar;
