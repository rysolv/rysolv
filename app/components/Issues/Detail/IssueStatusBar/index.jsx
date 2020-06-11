import React from 'react';
import T from 'prop-types';

import { FundingWrapper } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import {
  StatusBar,
  StatusItem,
  StatusTitle,
  StyledSecondaryButton,
} from './styledComponents';

const IssueStatusBar = ({
  activeUser,
  activeUser: { id: userId },
  data,
  dispatchOpenModal,
  handleIncrement,
  isDesktop,
  isSignedIn,
}) => {
  const { attempting, fundedAmount, id, open } = data;
  const hasAttempting =
    activeUser.attempting && !!activeUser.attempting.find(el => el.id === id);
  return (
    <StatusBar>
      <StatusItem>
        <StatusTitle>{attempting.length} Attempting</StatusTitle>
        <StyledSecondaryButton
          disabled={!open}
          label={hasAttempting ? 'un-attempt' : 'attempt'}
          onClick={() => {
            if (!isSignedIn) {
              return dispatchOpenModal({ modalState: 'signIn' });
            }
            return handleIncrement({
              userId,
              id,
              column: 'attempting',
              remove: hasAttempting,
            });
          }}
        />
      </StatusItem>
      <StatusItem>
        <StatusTitle>0 Pull Requests</StatusTitle>
        <StyledSecondaryButton
          disabled={!open}
          label="Submit PR"
          onClick={() => {
            if (!isSignedIn) {
              return dispatchOpenModal({ modalState: 'signIn' });
            }
            return null;
          }}
        />
      </StatusItem>
      {!isDesktop && (
        <StatusItem>
          <StatusTitle>
            Funded:{' '}
            <FundingWrapper
              medium
              open={open}
              value={formatDollarAmount(fundedAmount)}
            />
          </StatusTitle>
          <StyledSecondaryButton disabled={!open} label="$ Fund Issue" />
        </StatusItem>
      )}
    </StatusBar>
  );
};

IssueStatusBar.propTypes = {
  activeUser: T.object,
  data: T.object,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isDesktop: T.bool,
  isSignedIn: T.bool,
};

export default IssueStatusBar;
