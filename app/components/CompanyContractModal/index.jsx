import React from 'react';
import T from 'prop-types';

import { Checkbox } from 'components/base_ui';

import {
  ButtonGroup,
  CheckboxWrapper,
  ContentGroup,
  HorizontalDivider,
  LegalTextWrapper,
  StyledButton,
  Subtitle,
  Title,
  ViewContainer,
} from './styledComponents';

const ContractModal = ({
  companyId,
  contract,
  dispatchChangeInput,
  dispatchSubmitContractAccepted,
  handleClose,
  paymentConfirmed,
}) => {
  const { body, contractAccepted, key, subtitle, title } = contract;

  return (
    <ViewContainer>
      <Title>{title}</Title>
      <HorizontalDivider />
      <ContentGroup>
        <Subtitle>{subtitle}</Subtitle>
        <LegalTextWrapper isFirst>{body}</LegalTextWrapper>
        <CheckboxWrapper>
          <Checkbox
            checked={contractAccepted}
            onChange={() =>
              dispatchChangeInput({
                field: 'contractAccepted',
                form: 'contract',
                value: !contractAccepted,
              })
            }
          />
          <span>I agree to the above Terms and Conditions.</span>
        </CheckboxWrapper>
      </ContentGroup>
      <ButtonGroup>
        <StyledButton disableRipple onClick={() => handleClose()}>
          Cancel
        </StyledButton>
        <StyledButton
          disabled={!contractAccepted}
          disableRipple
          onClick={() =>
            dispatchSubmitContractAccepted({
              companyId,
              paymentConfirmed,
              plan: key,
            })
          }
        >
          Confirm
        </StyledButton>
      </ButtonGroup>
    </ViewContainer>
  );
};

ContractModal.propTypes = {
  companyId: T.string.isRequired,
  contract: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchSubmitContractAccepted: T.func.isRequired,
  handleClose: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
};

export default ContractModal;
