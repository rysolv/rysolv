import React from 'react';
import T from 'prop-types';

import { Checkbox } from 'components/base_ui';

import {
  ButtonWrapper,
  CheckboxWrapper,
  ContentGroup,
  DescriptionWrapper,
  LegalTextWrapper,
  ModalContainer,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyledTitle,
} from './styledComponents';

const CompanyContract = ({
  companyId,
  contract,
  dispatchChangeInput,
  dispatchSubmitContractAccepted,
  handleClose,
  paymentConfirmed,
}) => {
  const { body, contractAccepted, key, subtitle, title } = contract;

  return (
    <ModalContainer>
      <StyledTitle>{title}</StyledTitle>
      <ContentGroup>
        <DescriptionWrapper>{subtitle}</DescriptionWrapper>
        <LegalTextWrapper>{body}</LegalTextWrapper>
        <CheckboxWrapper>
          <Checkbox
            checked={contractAccepted}
            onChange={(e, value) =>
              dispatchChangeInput({
                field: 'contractAccepted',
                form: 'contract',
                value,
              })
            }
          />
          <span>I agree to the above Terms and Conditions.</span>
        </CheckboxWrapper>
      </ContentGroup>
      <ButtonWrapper>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          disabled={!contractAccepted}
          disableRipple
          onClick={() =>
            dispatchSubmitContractAccepted({
              companyId,
              paymentConfirmed,
              plan: key,
            })
          }
          label="Confirm"
        />
      </ButtonWrapper>
    </ModalContainer>
  );
};

CompanyContract.propTypes = {
  companyId: T.string.isRequired,
  contract: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchSubmitContractAccepted: T.func.isRequired,
  handleClose: T.func.isRequired,
  paymentConfirmed: T.bool.isRequired,
};

export default CompanyContract;
