import React, { Fragment, useRef } from 'react';
import T from 'prop-types';

import {
  CreditCardViewContainer,
  HorizontalInputWrapper,
  InputWrapper,
  StyledBaseInputWithAdornment,
  StyledPrimaryAsyncButton,
  StyledReCAPTCHA,
} from './styledComponents';

const CreditCardView = ({
  creditCardNumber,
  cvcValue,
  dateValue,
  dispatchVerifyRecaptcha,
  dispatchVerifyRecaptchaFailure,
  handleCreditCardNumberChange,
  handleCvcChange,
  handleDateChange,
  handleZipChange,
  setCreditCardNumber,
  setCvcValue,
  setDateValue,
  setZipValue,
  zipValue,
}) => {
  const recaptchaRef = useRef(null);
  return (
    <Fragment>
      <CreditCardViewContainer>
        <InputWrapper>
          <StyledBaseInputWithAdornment
            adornmentComponent="Number"
            fontSize="1rem"
            inputProps={{ maxLength: 19 }}
            onChange={e =>
              handleCreditCardNumberChange(
                e,
                e.target.value,
                setCreditCardNumber,
              )
            }
            value={creditCardNumber}
          />
          <StyledBaseInputWithAdornment
            adornmentComponent="MM/YYYY"
            fontSize="1rem"
            inputProps={{ maxLength: 7 }}
            onChange={e => handleDateChange(e, e.target.value, setDateValue)}
            value={dateValue}
          />
          <HorizontalInputWrapper>
            <StyledBaseInputWithAdornment
              adornmentComponent="CVC"
              fontSize="1rem"
              inputProps={{ maxLength: 3 }}
              onChange={e => handleCvcChange(e, e.target.value, setCvcValue)}
              value={cvcValue}
            />
            <StyledBaseInputWithAdornment
              adornmentComponent="Zip"
              fontSize="1rem"
              inputProps={{ maxLength: 5 }}
              onChange={e => handleZipChange(e, e.target.value, setZipValue)}
              value={zipValue}
            />
          </HorizontalInputWrapper>
          <StyledReCAPTCHA
            ref={recaptchaRef}
            onChange={response =>
              dispatchVerifyRecaptcha({
                resetRecaptcha: () => recaptchaRef.current.reset(),
                response,
              })
            }
            onExpired={dispatchVerifyRecaptchaFailure}
            sitekey={process.env.RECAPTCHA_SITE_KEY}
          />
        </InputWrapper>
        <StyledPrimaryAsyncButton label="Confirm" onClick={() => {}} />
      </CreditCardViewContainer>
    </Fragment>
  );
};

CreditCardView.propTypes = {
  creditCardNumber: T.string,
  cvcValue: T.string,
  dateValue: T.string,
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchaFailure: T.func,
  handleCreditCardNumberChange: T.func,
  handleCvcChange: T.func,
  handleDateChange: T.func,
  handleZipChange: T.func,
  setCreditCardNumber: T.func,
  setCvcValue: T.func,
  setDateValue: T.func,
  setZipValue: T.func,
  zipValue: T.string,
};

export default CreditCardView;
