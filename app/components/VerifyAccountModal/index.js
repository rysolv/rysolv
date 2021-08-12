import React from 'react';
import T from 'prop-types';

import { PrimaryButton } from 'components/base_ui';

import {
  ButtonGroup,
  StyledBodyMessage,
  StyledPrimaryButton,
  StyledTitle,
  VerifyAccountContainer,
} from './styledComponents';

const VerifyAccountModal = ({ handleClose, handleRedirect }) => (
  <VerifyAccountContainer>
    <StyledTitle>Verify your account...</StyledTitle>
    <StyledBodyMessage>
      Your account must be connected with Github before you can submit a pull
      request.
    </StyledBodyMessage>
    <ButtonGroup>
      <StyledPrimaryButton label="Cancel" onClick={handleClose} />
      <PrimaryButton
        label="Connect"
        onClick={() => handleRedirect('/settings')}
      />
    </ButtonGroup>
  </VerifyAccountContainer>
);

VerifyAccountModal.propTypes = {
  handleClose: T.func.isRequired,
  handleRedirect: T.func.isRequired,
};

export default VerifyAccountModal;
