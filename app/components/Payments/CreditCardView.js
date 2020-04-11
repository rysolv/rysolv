import React, { Fragment } from 'react';
import T from 'prop-types';

import {
  CreditCardViewContainer,
  HorizontalInputWrapper,
  InputWrapper,
  StyledBaseInputWithAdornment,
  StyledPrimaryAsyncButton,
} from './styledComponents';

const CreditCardView = ({
  creditCardNumber,
  cvcValue,
  dateValue,
  handleCreditCardNumberChange,
  handleCvcChange,
  handleDateChange,
  handleZipChange,
  zipValue,
}) => (
  <Fragment>
    <CreditCardViewContainer>
      <InputWrapper>
        <StyledBaseInputWithAdornment
          adornmentComponent="Number"
          fontSize="1rem"
          inputProps={{ maxLength: 19 }}
          onChange={e => handleCreditCardNumberChange(e, e.target.value)}
          value={creditCardNumber}
        />
        <StyledBaseInputWithAdornment
          adornmentComponent="MM/YYYY"
          fontSize="1rem"
          inputProps={{ maxLength: 7 }}
          onChange={e => handleDateChange(e, e.target.value)}
          value={dateValue}
        />
        <HorizontalInputWrapper>
          <StyledBaseInputWithAdornment
            adornmentComponent="CVC"
            fontSize="1rem"
            inputProps={{ maxLength: 3 }}
            onChange={e => handleCvcChange(e, e.target.value)}
            value={cvcValue}
          />
          <StyledBaseInputWithAdornment
            adornmentComponent="Zip"
            fontSize="1rem"
            inputProps={{ maxLength: 5 }}
            onChange={e => handleZipChange(e, e.target.value)}
            value={zipValue}
          />
        </HorizontalInputWrapper>
      </InputWrapper>
      <StyledPrimaryAsyncButton label="Confirm" onClick={() => {}} />
    </CreditCardViewContainer>
  </Fragment>
);

CreditCardView.propTypes = {
  creditCardNumber: T.string,
  cvcValue: T.string,
  dateValue: T.string,
  handleCreditCardNumberChange: T.func,
  handleCvcChange: T.func,
  handleDateChange: T.func,
  handleZipChange: T.func,
  zipValue: T.string,
};

export default CreditCardView;
