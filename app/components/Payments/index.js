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
  FundingContainer,
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
  email,
  firstName,
  fundedAmount,
  handleClearAlerts,
  handleNav,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
  lastName,
  open,
  paymentAlerts: { error, success },
  userId,
  ...restProps
}) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvcValue, setCvcValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [emailValue, setEmailValue] = useState(email || '');
  const [fundValue, setFundValue] = useState('2');
  const [isAccountPaymentOpen, setIsAccountPaymentOpen] = useState(true);
  const [isCreditPaymentOpen, setIsCreditPaymentOpen] = useState(false);
  const [isPaypalPaymentOpen, setIsPaypalPaymentOpen] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState(firstName || '');
  const [lastNameValue, setLastNameValue] = useState(lastName || '');
  const [zipValue, setZipValue] = useState('');

  const handleChangeDollarValue = (e, valuePassedIn) => {
    const { value: valueFromTarget } = e.target;
    const value = valuePassedIn || valueFromTarget;
    const compareValue = isSignedIn ? balance : 1000000;
    if (value <= compareValue) {
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

  const handleChangePaymentPanel = (type) => {
    if (type === 'account') {
      if (isAccountPaymentOpen) {
        setIsAccountPaymentOpen(false);
      } else {
        setIsAccountPaymentOpen(true);
      }
      setIsCreditPaymentOpen(false);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'credit') {
      if (isCreditPaymentOpen) {
        setIsCreditPaymentOpen(false);
      } else {
        setIsCreditPaymentOpen(true);
      }
      setIsAccountPaymentOpen(false);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'paypal') {
      if (isPaypalPaymentOpen) {
        setIsPaypalPaymentOpen(false);
      } else {
        setIsPaypalPaymentOpen(true);
      }
      setIsAccountPaymentOpen(false);
      setIsCreditPaymentOpen(false);
    }
  };

  const handleEmailValueChange = (event, newEmail) => {
    setEmailValue(newEmail);
  };

  const handleFirstNameValueChange = (event, newName) => {
    setFirstNameValue(newName);
  };

  const handleLastNameValueChange = (event, newName) => {
    setLastNameValue(newName);
  };
  const propsToPassDown = {
    creditCardNumber,
    cvcValue,
    dateValue,
    dispatchVerifyRecaptcha,
    dispatchVerifyRecaptchaFailure,
    emailValue,
    firstNameValue,
    handleCreditCardNumberChange,
    handleCvcChange,
    handleDateChange,
    handleZipChange,
    isCreditPaymentOpen,
    lastNameValue,
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
        <Funded isFunded={!fundedAmount || !open}>{fundedAmount ? 'Funded' : 'Unfunded'}</Funded>
      </OverviewWrapper>
      <FundingContainer open={open}>
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
            adornmentComponent="First Name"
            fontSize="1rem"
            onChange={e => handleFirstNameValueChange(e, e.target.value)}
            value={firstNameValue}
          />
          <StyledBaseInputWithAdornment
            adornmentComponent="Last Name"
            fontSize="1rem"
            onChange={e => handleLastNameValueChange(e, e.target.value)}
            value={lastNameValue}
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
              expanded={isAccountPaymentOpen}
              handleLabelClick={() => handleChangePaymentPanel('account')}
              Icon={AccountIcon}
              propsToPassDown={{
                balance,
                emailValue,
                firstNameValue,
                fundValue,
                handleSubmitAccountPayment,
                issueId,
                lastNameValue,
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
          expanded={isCreditPaymentOpen}
          handleLabelClick={() => handleChangePaymentPanel('credit')}
          Icon={CreditCardIcon}
          propsToPassDown={propsToPassDown}
          title="Credit Card"
        />
        <BaseExpansionPanel
          Component={PaypalView}
          expanded={isPaypalPaymentOpen}
          handleLabelClick={() => handleChangePaymentPanel('paypal')}
          Icon={PaypalIcon}
          propsToPassDown={{ isPaypalPaymentOpen }}
          title="Paypal"
        />
      </FundingContainer>
    </PaymentContainer>
  );
};

PaymentPortal.propTypes = {
  balance: T.number,
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchaFailure: T.func,
  email: T.string,
  firstName: T.string,
  fundedAmount: T.number,
  handleClearAlerts: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  paymentAlerts: T.object,
  userId: T.string,
};

export default PaymentPortal;
