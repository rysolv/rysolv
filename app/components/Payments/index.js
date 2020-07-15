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
  fundedAmount,
  handleClearAlerts,
  handleNav,
  handleSubmitAccountPayment,
  isSignedIn,
  issueId,
  open,
  paymentAlerts: { error, success },
  userId,
  ...restProps
}) => {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvcValue, setCvcValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [fundValue, setFundValue] = useState('2');
  const [isAccountPaymentOpen, setIsAccountPaymentOpen] = useState(true);
  const [isCreditPaymentOpen, setIsCreditPaymentOpen] = useState(false);
  const [isPaypalPaymentOpen, setIsPaypalPaymentOpen] = useState(false);
  const [nameValue, setNameValue] = useState('');
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

  const handleChangePaymentPanel = (type) => {
    if (type === 'account') {
      setIsAccountPaymentOpen(true);
      setIsCreditPaymentOpen(false);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'credit') {
      setIsAccountPaymentOpen(false);
      setIsCreditPaymentOpen(true);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'paypal') {
      setIsAccountPaymentOpen(false);
      setIsCreditPaymentOpen(false);
      setIsPaypalPaymentOpen(true);
    }
  };

  const handleEmailValueChange = (event, newEmail) => {
    setEmailValue(newEmail);
  };

  const handleNameValueChange = (event, newName) => {
    setNameValue(newName);
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
              expanded={isAccountPaymentOpen}
              Icon={AccountIcon}
              onClick={() => handleChangePaymentPanel('account')}
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
          expanded={isCreditPaymentOpen}
          Icon={CreditCardIcon}
          onClick={() => handleChangePaymentPanel('credit')}
          propsToPassDown={propsToPassDown}
          title="Credit Card"
        />
        <BaseExpansionPanel
          Component={PaypalView}
          expanded={isPaypalPaymentOpen}
          Icon={PaypalIcon}
          onClick={() => handleChangePaymentPanel('paypal')}
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
  fundedAmount: T.number,
  handleClearAlerts: T.func,
  handleNav: T.func,
  handleSubmitAccountPayment: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  open: T.bool,
  paymentAlerts: T.object,
  userId: T.string,
};

export default PaymentPortal;
