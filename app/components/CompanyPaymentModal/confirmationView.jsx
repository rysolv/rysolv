import React from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  ContentGroup,
  DescriptionWrapper,
  HorizontalDivider,
  StyledButton,
  Title,
  ViewContainer,
} from './styledComponents';

const ContractConfirmationModal = ({ handleClose }) => (
  <ViewContainer>
    <Title>Your payment method has been updated!</Title>
    <HorizontalDivider />
    <ContentGroup>
      <DescriptionWrapper>
        You will receive a confirmation via email. This upgrade will be
        reflected on your next billing cycle.
      </DescriptionWrapper>
    </ContentGroup>
    <ButtonGroup>
      <StyledButton disableRipple onClick={() => handleClose()}>
        Close
      </StyledButton>
    </ButtonGroup>
  </ViewContainer>
);

ContractConfirmationModal.propTypes = {
  handleClose: T.func.isRequired,
};

export default ContractConfirmationModal;
