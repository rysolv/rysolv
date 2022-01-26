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

const SigninModal = ({ handleClose, handleRedirect }) => (
  <ModalContainer>
    <StyledTitle>Sign in to continue...</StyledTitle>
    <TextWrapper>
      You must be signed in your Rysolv account to use this feature.
    </TextWrapper>
    <ButtonWrapper>
      <StyledSecondaryButton label="Close" onClick={handleClose} />
      <StyledPrimaryButton
        label="Sign in"
        onClick={() => handleRedirect('/signin')}
      />
    </ButtonWrapper>
  </ModalContainer>
);

SigninModal.propTypes = {
  handleClose: T.func.isRequired,
  handleRedirect: T.func.isRequired,
};

export default SigninModal;
