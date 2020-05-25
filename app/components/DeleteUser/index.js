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

const DeleteUser = ({ handleClose, handleDeleteUser, userId }) => (
  <DeleteUserContainer>
    <StyledTitle>Account Removal</StyledTitle>
    <StyledBodyMessage>
      Do you really want to delete your account? Your history and issues will be
      deleted, and this cannot be undone.
    </StyledBodyMessage>
    <ButtonGroup>
      <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      <StyledPrimaryAsyncButton
        label="Confirm"
        onClick={() => handleDeleteUser({ userId })}
      />
    </ButtonGroup>
  </DeleteUserContainer>
);

DeleteUser.propTypes = {
  handleClose: T.func.isRequired,
  handleDeleteUser: T.func.isRequired,
  userId: T.string.isRequired,
};

export default DeleteUser;
