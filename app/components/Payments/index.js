/* eslint-disable prettier/prettier */
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
  const [fundValue, setFundValue] = useState('2');
  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [cvcValue, setCvcValue] = useState('');
  const [zipValue, setZipValue] = useState('');

  const handleChangeDollarValue = (e, valuePassedIn) => {
    const { value: valueFromTarget } = e.target;
    const value = valuePassedIn || valueFromTarget;
    if (value <= balance) {
      const string = value
        ? value
          .replace(',', '.')
          .replace(/[^\d.]/g, '')
          .replace(/\./, 'x')
          .replace(/\./g, '')
          .replace(/x/, '.')
        : '0';
      const formattedString =
        string.length === 1
          ? string.split('.')
          : string.replace(/^0+/, '').split('.');

      if (formattedString.length === 1) {
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
      if (formattedString.length === 2) {
        formattedString[0] = formattedString[0] === '' ? '0' : formattedString[0];
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
    }
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
          fundValue={fundValue}
          handleChange={handleChangeDollarValue}
        />
        - or -
        <StyledBaseInputWithAdornment
          adornmentComponent="$"
          fontSize="1.4rem"
          onChange={e => handleChangeDollarValue(e, e.target.value)}
          value={fundValue}
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
              fundValue,
              handleSubmitAccountPayment,
              issueId,
              setFundValue,
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
