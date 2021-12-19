import React from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  ContentGroup,
  QuestionWrapper,
  StyledButton,
  ViewContainer,
} from './styledComponents';

const CompanyPaymentModal = ({
  dispatchUpdatePaymentMethod,
  handleClose,
  paymentConfirmed,
}) => (
  <ViewContainer>
    <QuestionWrapper>
      {paymentConfirmed ? 'Update' : 'Add'} Payment Method
    </QuestionWrapper>
    <ContentGroup>Payment method:</ContentGroup>
    <ButtonGroup>
      <StyledButton disableRipple onClick={handleClose}>
        Cancel
      </StyledButton>
      <StyledButton disableRipple onClick={dispatchUpdatePaymentMethod}>
        Confirm
      </StyledButton>
    </ButtonGroup>
  </ViewContainer>
);

CompanyPaymentModal.propTypes = {
  dispatchUpdatePaymentMethod: T.func.isRequired,
  handleClose: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
};

export default CompanyPaymentModal;
