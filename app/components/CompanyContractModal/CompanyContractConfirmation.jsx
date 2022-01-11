import React from 'react';
import T from 'prop-types';

import {
  ButtonWrapper,
  ModalContainer,
  StyledPrimaryButton,
  StyledTitle,
  TextWrapper,
} from './styledComponents';

const CompanyContractConfirmation = ({ contract, handleClose }) => {
  const { title } = contract;

  return (
    <ModalContainer>
      <StyledTitle isConfirmation>Your account has been upgraded!</StyledTitle>
      <TextWrapper isFirst>You are now on the {title} plan.</TextWrapper>
      <TextWrapper>
        You now have access to all {title} features. This upgrade will be
        reflected on your next billing cycle.
      </TextWrapper>
      <ButtonWrapper>
        <StyledPrimaryButton label="Close" onClick={handleClose} />
      </ButtonWrapper>
    </ModalContainer>
  );
};

CompanyContractConfirmation.propTypes = {
  contract: T.object.isRequired,
  handleClose: T.func.isRequired,
};

export default CompanyContractConfirmation;
