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

const CloseIssueModal = ({
  handleClose,
  handleCloseIssue,
  tableData: { issueId },
}) => (
  <DeleteUserContainer>
    <StyledTitle>Close Issue</StyledTitle>
    <StyledBodyMessage>
      Do you really want to close your issue? If your issue has funding
      associated with it, funding will be returned to users.
    </StyledBodyMessage>
    <ButtonGroup>
      <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      <StyledPrimaryAsyncButton
        label="Confirm"
        onClick={() => handleCloseIssue({ issueId, shouldClose: true })}
      />
    </ButtonGroup>
  </DeleteUserContainer>
);

CloseIssueModal.propTypes = {
  handleClose: T.func.isRequired,
  handleCloseIssue: T.func.isRequired,
  tableData: T.object.isRequired,
};

export default CloseIssueModal;
