import React from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  DeleteUserContainer,
  StyledBodyMessage,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const DeleteUserModal = ({ balance, handleClose, handleDeleteUser }) => {
  const deleteUserMessage = (
    <DeleteUserContainer>
      <StyledTitle>Account Removal</StyledTitle>
      <StyledBodyMessage>
        Do you really want to delete your account? Your history and outstanding
        pull requests will be deleted. This cannot be undone.
      </StyledBodyMessage>
      <ButtonGroup>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton label="Confirm" onClick={handleDeleteUser} />
      </ButtonGroup>
    </DeleteUserContainer>
  );

  const remainingBalanceMessage = (
    <DeleteUserContainer>
      <StyledTitle>Outstanding Balance</StyledTitle>
      <StyledBodyMessage>
        Your account cannot be deleted with an outstanding balance. Please
        withdraw funds from your account before proceeding.
      </StyledBodyMessage>
      <ButtonGroup>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      </ButtonGroup>
    </DeleteUserContainer>
  );

  return balance ? remainingBalanceMessage : deleteUserMessage;
};

DeleteUserModal.propTypes = {
  balance: T.number.isRequired,
  handleClose: T.func.isRequired,
  handleDeleteUser: T.func.isRequired,
};

export default DeleteUserModal;
