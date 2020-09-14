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
  dispatchFetchAttemptList,
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
            issueId,
            userId,
          });
        }}
      >
        {AttemptIcon}
        <LabelWrapper>{hasAttempting ? 'Unattempt' : 'Attempt'}</LabelWrapper>
      </StyledAttemptButton>
      <ValueWrapper
        onClick={() =>
          dispatchFetchAttemptList({
            issueId,
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
  dispatchFetchAttemptList: T.func.isRequired,
  dispatchOpenModal: T.func,
  handleIncrement: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  userId: T.string,
};

export default AttemptButton;
