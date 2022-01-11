import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  ModalContainer,
  StyledPrimaryButton,
  StyledTitle,
  TextWrapper,
} from './styledComponents';

const CompanyPaymentConfirmation = ({ handleClose }) => (
  <ModalContainer>
    <StyledTitle isConfirmation>
      Your payment method has been updated!
    </StyledTitle>
    <TextWrapper>
      You will receive a confirmation via email. This upgrade will be reflected
      on your next billing cycle.
    </TextWrapper>
    <ButtonWrapper>
      <StyledPrimaryButton label="Close" onClick={handleClose} />
    </ButtonWrapper>
  </ModalContainer>
);

CompanyPaymentConfirmation.propTypes = { handleClose: T.func.isRequired };

export default CompanyPaymentConfirmation;
