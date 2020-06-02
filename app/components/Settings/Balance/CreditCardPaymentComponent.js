import React from 'react';
import T from 'prop-types';

import { TooltipIcon } from 'components/base_ui';
import { CvvTooltip } from 'components/Tooltips';
import iconDictionary from 'utils/iconDictionary';

import {
  HorizontalWrapper,
  InputHeader,
  InputWrapper,
  StyledBaseInput,
  StyledPrimaryAsyncButton,
  TooltipIconWrapper,
} from './styledComponents';

const InfoIcon = iconDictionary('info');

const CreditCardPaymentComponent = ({
  amount,
  creditCardNumber,
  cvcValue,
  dateValue,
  handleCreditCardNumberChange,
  handleCvcChange,
  handleDateChange,
  handleSubmitPayment,
  handleZipChange,
  setCreditCardNumber,
  setCvcValue,
  setDateValue,
  setZipValue,
  zipValue,
}) => (
  <div>
    <InputWrapper>
      <InputHeader>Card Number</InputHeader>
      <StyledBaseInput
        inputProps={{ maxLength: 19 }}
        onChange={e =>
          handleCreditCardNumberChange(e, e.target.value, setCreditCardNumber)
        }
        value={creditCardNumber}
        width="50%"
      />
    </InputWrapper>
    <HorizontalWrapper>
      <InputWrapper>
        <InputHeader>Expiration Date</InputHeader>
        <StyledBaseInput
          inputProps={{ maxLength: 7 }}
          onChange={e => handleDateChange(e, e.target.value, setDateValue)}
          placeholder="MM/YYYY"
          value={dateValue}
          width="50%"
        />
      </InputWrapper>
      <InputWrapper>
        <InputHeader>
          CVV
          <TooltipIconWrapper>
            <TooltipIcon Icon={InfoIcon} Tooltip={CvvTooltip} />
          </TooltipIconWrapper>
        </InputHeader>
        <StyledBaseInput
          inputProps={{ maxLength: 3 }}
          onChange={e => handleCvcChange(e, e.target.value, setCvcValue)}
          value={cvcValue}
          width="50%"
        />
      </InputWrapper>
    </HorizontalWrapper>
    <InputWrapper>
      <InputHeader>Postal Code</InputHeader>
      <StyledBaseInput
        inputProps={{ maxLength: 5 }}
        onChange={e => handleZipChange(e, e.target.value, setZipValue)}
        value={zipValue}
        width="25%"
      />
    </InputWrapper>
    <StyledPrimaryAsyncButton
      label="Confirm"
      onClick={() => handleSubmitPayment({ amount })}
    />
  </div>
);

CreditCardPaymentComponent.propTypes = {
  amount: T.string,
  creditCardNumber: T.string,
  cvcValue: T.string,
  dateValue: T.string,
  handleCreditCardNumberChange: T.func,
  handleCvcChange: T.func,
  handleDateChange: T.func,
  handleSubmitPayment: T.func,
  handleZipChange: T.func,
  setCreditCardNumber: T.func,
  setCvcValue: T.func,
  setDateValue: T.func,
  setZipValue: T.func,
  zipValue: T.string,
};

export default CreditCardPaymentComponent;
