import React from 'react';
import T from 'prop-types';
import { MonocleIcon } from '../../Icons';

import {
  LabelWrapper,
  StyledWatchIssueButton,
  ValueWrapper,
  WatchIssueButtonContainer,
} from './styledComponents';

const WatchIssueButton = ({
  disabled,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleWatch,
  isSignedIn,
  issueId,
  label,
  value,
}) => (
  <WatchIssueButtonContainer>
    <StyledWatchIssueButton
      disabled={disabled}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        return handleWatch();
      }}
    >
      <MonocleIcon /> <LabelWrapper>{label}</LabelWrapper>
    </StyledWatchIssueButton>
    <ValueWrapper
      onClick={() =>
        dispatchFetchWatchList({
          issueId,
          modalState: 'issueWatchList',
        })
      }
    >
      {value}
    </ValueWrapper>
  </WatchIssueButtonContainer>
);

WatchIssueButton.propTypes = {
  disabled: T.bool,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleWatch: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  label: T.string,
  value: T.number,
};

export default WatchIssueButton;
