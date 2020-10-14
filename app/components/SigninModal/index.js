import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';

import {
  ButtonGroup,
  SigninContainer,
  StyledBodyMessage,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const SigninModal = ({ handleClose, handleRedirect }) => (
  <SigninContainer>
    <StyledTitle>Sign in to continue...</StyledTitle>
    <StyledBodyMessage>
      You must be signed in your Rysolv account to use this feature.
    </StyledBodyMessage>
    <ButtonGroup>
      <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      <PrimaryButton
        label="Sign In"
        onClick={() => handleRedirect('/signin')}
      />
    </ButtonGroup>
  </SigninContainer>
);

SigninModal.propTypes = {
  handleClose: T.func.isRequired,
  handleRedirect: T.func.isRequired,
};

export default SigninModal;
