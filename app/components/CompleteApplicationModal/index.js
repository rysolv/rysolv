import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  ModalContainer,
  StyledBodyMessage,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const CompleteApplicationModal = ({ handleClose, handleNav }) => (
  <ModalContainer>
    <StyledTitle>Complete application to continue...</StyledTitle>
    <StyledBodyMessage>
      You must complete the job application to apply to this position.
    </StyledBodyMessage>
    <ButtonWrapper>
      <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      <StyledPrimaryAsyncButton
        label="Start application"
        onClick={() => handleNav('/apply')}
      />
    </ButtonWrapper>
  </ModalContainer>
);

CompleteApplicationModal.propTypes = {
  handleClose: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default CompleteApplicationModal;
