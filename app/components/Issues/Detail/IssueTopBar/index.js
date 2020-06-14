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
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleIncrement,
  isDesktop,
  isSignedIn,
}) => {
  const { fundedAmount, open } = data;
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
              open={open}
            />
          )}
        </IssueBarTopRow>

        <IssueBarBottomRow>
          <StyledIssueButtonBar
            activeUser={activeUser}
            data={data}
            dispatchFetchWatchList={dispatchFetchWatchList}
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
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isDesktop: T.bool,
  isSignedIn: T.bool,
};

export default IssueTopBar;
