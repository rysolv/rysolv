import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  AttemptButtonContainer,
  LabelWrapper,
  StyledAttemptButton,
  ValueWrapper,
} from './styledComponents';

const AttemptIcon = iconDictionary('attempt');

const AttemptButton = ({
  activeUser,
  attempting,
  disabled,
  dispatchFetchWatchList,
  dispatchOpenModal,
  handleIncrement,
  isSignedIn,
  issueId,
  userId,
}) => {
  const hasAttempting =
    activeUser.attempting &&
    !!activeUser.attempting.find(({ id }) => id === issueId);
  return (
    <AttemptButtonContainer>
      <StyledAttemptButton
        disabled={disabled}
        onClick={() => {
          if (!isSignedIn) {
            return dispatchOpenModal({ modalState: 'signIn' });
          }
          return handleIncrement({
            userId,
            id: issueId,
            column: 'attempting',
            remove: hasAttempting,
          });
        }}
      >
        {AttemptIcon}
        <LabelWrapper>{hasAttempting ? 'Unattempt' : 'Attempt'}</LabelWrapper>
      </StyledAttemptButton>
      <ValueWrapper
        onClick={() =>
          dispatchFetchWatchList({
            idArray: attempting,
            modalState: 'issueAttemptList',
          })
        }
      >
        {attempting.length}
      </ValueWrapper>
    </AttemptButtonContainer>
  );
};

AttemptButton.propTypes = {
  activeUser: T.object,
  attempting: T.array,
  disabled: T.bool,
  dispatchFetchWatchList: T.func,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  userId: T.string,
};

export default AttemptButton;
