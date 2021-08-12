import React from 'react';
import T from 'prop-types';
import { MonocleIcon } from '../Icons';

import {
  StyledWatchButton,
  WatchButtonContainer,
  ValueWrapper,
  LabelWrapper,
} from './styledComponents';

const WatchButton = ({
  disabled,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleWatch,
  isSignedIn,
  issueId,
  label,
  value,
}) => (
  <WatchButtonContainer>
    <StyledWatchButton
      disabled={disabled}
      onClick={() => {
        if (!isSignedIn) {
          return dispatchOpenModal({ modalState: 'signIn' });
        }
        return handleWatch();
      }}
    >
      <MonocleIcon /> <LabelWrapper>{label}</LabelWrapper>
    </StyledWatchButton>
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
  </WatchButtonContainer>
);

WatchButton.propTypes = {
  disabled: T.bool,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleWatch: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  label: T.string,
  value: T.number,
};

export default WatchButton;
