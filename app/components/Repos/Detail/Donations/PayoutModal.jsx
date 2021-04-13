import React from 'react';
import T from 'prop-types';

import {
  ButtonGroup,
  InputWrapper,
  PayoutContainer,
  StyledBodyMessage,
  StyledMenuItem,
  StyledPrimaryAsyncButton,
  StyledPrimaryButton,
  StyleDropdown,
  StyledTitle,
} from './styledComponents';
import { StyledBaseTextInput } from '../styledComponents';

const PayoutModal = ({
  handleAddPayout,
  handleClose,
  payoutMethod,
  payoutUrlChange,
  payoutUrlError,
  setPayoutMethod,
  setPayoutUrlChange,
}) => {
  const isDisabled = !(!!payoutMethod && !!payoutUrlChange);

  return (
    <PayoutContainer>
      <StyledTitle>Add Payout Method</StyledTitle>
      <StyledBodyMessage hasPadding>
        If you add a payout method, 10% or more of all solved bountied will be
        donated to that payout method.
      </StyledBodyMessage>
      <StyledBodyMessage>
        Payouts are accumulated on Rysolv and paid out every 30 days.
      </StyledBodyMessage>
      <InputWrapper>
        <StyleDropdown
          onChange={e => setPayoutMethod(e.target.value)}
          value={payoutMethod}
          variant="outlined"
        >
          <StyledMenuItem disabled value="Payment Methods">
            Payment Methods
          </StyledMenuItem>
          <StyledMenuItem value="Github Sponsors">
            Github Sponsors
          </StyledMenuItem>
          <StyledMenuItem value="Open Collective">
            Open Collective
          </StyledMenuItem>
          <StyledMenuItem value="Paypal">Paypal</StyledMenuItem>
        </StyleDropdown>
        <StyledBaseTextInput
          error={!!payoutUrlError}
          helperText={payoutUrlError}
          onChange={e => setPayoutUrlChange(e.target.value)}
          placeholder={payoutUrlChange || 'https://github.com/sponsors/rysolv'}
          value={payoutUrlChange || ''}
          width="50%"
        />
      </InputWrapper>
      <ButtonGroup>
        <StyledPrimaryButton label="Cancel" onClick={handleClose} />
        <StyledPrimaryAsyncButton
          disabled={isDisabled}
          label="Save"
          onClick={handleAddPayout}
        />
      </ButtonGroup>
    </PayoutContainer>
  );
};

PayoutModal.propTypes = {
  handleAddPayout: T.func.isRequired,
  handleClose: T.func.isRequired,
  payoutMethod: T.string.isRequired,
  payoutUrlChange: T.string,
  payoutUrlError: T.oneOfType([T.bool, T.string]).isRequired,
  setPayoutMethod: T.func.isRequired,
  setPayoutUrlChange: T.func.isRequired,
};

export default PayoutModal;
