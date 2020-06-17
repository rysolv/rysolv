import React, { useState } from 'react';
import T from 'prop-types';

import { BaseExpansionPanel, ConditionalRender } from 'components/base_ui';
import {
  formatDollarAmount,
  handleCreditCardNumberChange,
  handleCvcChange,
  handleDateChange,
  handleZipChange,
} from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import CreditCardView from './CreditCardView';
import DollarValueToggle from './DollarValueToggle';
import PaypalView from './PaypalView';
import YourAccountView from './YourAccountView';
import {
  Amount,
  Divider,
  DollarValueWrapper,
  Funded,
  OverviewWrapper,
  PaymentContainer,
  PaymentInformationWrapper,
  StyledBaseInputWithAdornment,
  StyledErrorSuccessBanner,
  StyledLabel,
} from './styledComponents';

const AccountIcon = iconDictionary('user');
const CreditCardIcon = iconDictionary('creditCard');
const PaypalIcon = iconDictionary('paypal');

const PaymentPortal = ({
  balance,
  dispatchVerifyRecaptcha,
  dispatchVerifyRecaptchaFailure,
  fundedAmount,
  handleClearAlerts,
  handleNav,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
  paymentAlerts: { error, success },
  userId,
  ...restProps
}) => {
  const [fundAmount, setFundAmount] = useState('2');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [cvcValue, setCvcValue] = useState('');
  const [zipValue, setZipValue] = useState('');

  const handleFundAmountChange = (event, newFundAmount) => {
    const formattedFundAmount = newFundAmount.replace(/[^0-9]/g, '');
    setFundAmount(formattedFundAmount);
  };
  const handleNameValueChange = (event, newName) => {
    setNameValue(newName);
  };
  const handleEmailValueChange = (event, newEmail) => {
    setEmailValue(newEmail);
  };
  const propsToPassDown = {
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
  };
  return (
    <PaymentContainer {...restProps}>
      <OverviewWrapper>
        <Amount>{formatDollarAmount(fundedAmount)}</Amount>
        <Funded>{fundedAmount ? 'Funded' : 'Unfunded'}</Funded>
      </OverviewWrapper>
      <DollarValueWrapper>
        <DollarValueToggle
          fundAmount={fundAmount}
          handleChange={handleFundAmountChange}
        />
        - or -
        <StyledBaseInputWithAdornment
          adornmentComponent="$"
          fontSize="1.4rem"
          onChange={e => handleFundAmountChange(e, e.target.value)}
          value={fundAmount}
        />
      </DollarValueWrapper>
      <Divider />
      <PaymentInformationWrapper>
        <StyledLabel>Information</StyledLabel>
        <StyledBaseInputWithAdornment
          adornmentComponent="Name"
          fontSize="1rem"
          onChange={e => handleNameValueChange(e, e.target.value)}
          value={nameValue}
        />
        <StyledBaseInputWithAdornment
          adornmentComponent="Email"
          fontSize="1rem"
          onChange={e => handleEmailValueChange(e, e.target.value)}
          value={emailValue}
        />
      </PaymentInformationWrapper>
      <StyledLabel>Payment Methods</StyledLabel>
      <StyledErrorSuccessBanner
        error={error}
        onClose={handleClearAlerts}
        success={success}
      />
      <ConditionalRender
        Component={() => (
          <BaseExpansionPanel
            Component={YourAccountView}
            Icon={AccountIcon}
            open
            propsToPassDown={{
              balance,
              handleSubmitAccountPayment,
              issueId,
              userId,
            }}
            title="Your Account"
          />
        )}
        shouldRender={isSignedIn}
      />
      <BaseExpansionPanel
        Component={CreditCardView}
        Icon={CreditCardIcon}
        propsToPassDown={propsToPassDown}
        title="Credit Card"
      />
      <BaseExpansionPanel
        Component={PaypalView}
        Icon={PaypalIcon}
        title="Paypal"
      />
    </PaymentContainer>
  );
};

PaymentPortal.propTypes = {
  balance: T.number,
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchaFailure: T.func,
  fundedAmount: T.number,
  handleClearAlerts: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  paymentAlerts: T.object,
  userId: T.string,
};

export default PaymentPortal;
