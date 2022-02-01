import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  ModalContainer,
  StyledPrimaryButton,
  StyledSecondaryButton,
  StyledTitle,
  TextWrapper,
} from './styledComponents';

const CompleteApplicationModal = ({ handleClose, handleNav }) => {
  const handleStartApplication = () => {
    handleClose();
    handleNav('/apply');
  };

  return (
    <ModalContainer>
      <StyledTitle>Complete application to continue...</StyledTitle>
      <TextWrapper>
        You must complete the job application to apply to this position.
      </TextWrapper>
      <ButtonWrapper>
        <StyledSecondaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryButton
          label="Start application"
          onClick={handleStartApplication}
        />
      </ButtonWrapper>
    </ModalContainer>
  );
};

CompleteApplicationModal.propTypes = {
  handleClose: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default CompleteApplicationModal;
