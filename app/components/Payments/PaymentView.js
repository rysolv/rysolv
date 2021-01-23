/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseExpansionPanel, ConditionalRender } from 'components/base_ui';
import { formatDollarAmount, handleZipChange } from 'utils/globalHelpers';
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
  PaymentInformationWrapper,
  StyledErrorSuccessBanner,
  StyledLabel,
  StyledPaymentTextInput,
} from './styledComponents';

const AccountIcon = iconDictionary('user');
const CreditCardIcon = iconDictionary('creditCard');
const PaypalIcon = iconDictionary('paypal');

const PaymentView = ({
  alerts: { error, success },
  balance,
  dispatchPaypalPayment,
  email,
  errors: {
    email: emailError,
    fundValue: fundValueError,
  },
  fundedAmount,
  handleClearPaymentAlerts,
  handleStripeToken,
  handleSubmitAccountPayment,
  handleValidateInput,
  isSignedIn,
  issueId,
  open,
}) => {
  const initialValue = '10';
  const [emailValue, setEmailValue] = useState(email || '');
  const [fundValue, setFundValue] = useState(initialValue);
  const [isAccountPaymentOpen, setIsAccountPaymentOpen] = useState(true);
  const [isCreditPaymentOpen, setIsCreditPaymentOpen] = useState(false);
  const [isPaypalPaymentOpen, setIsPaypalPaymentOpen] = useState(false);
  const [stripeError, setStripeError] = useState('');
  const [zipValue, setZipValue] = useState('');

  const isPersonalInfoComplete = !!emailValue;

  const values = {
    email: emailValue,
    fundValue,
  };

  const handleChangeDollarValue = (e, valuePassedIn) => {
    const { value: valueFromTarget } = e.target;
    const value = valuePassedIn || valueFromTarget;
    if (value <= 1000000) {
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
        formattedString[0] =
          formattedString[0] === '' ? '0' : formattedString[0];
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
    }
  };

  const handleChangePaymentPanel = type => {
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

  const handleClearAlerts = () => {
    setStripeError('');
    handleClearPaymentAlerts();
  };

  const handleEmailValueChange = (event, newEmail) => {
    setEmailValue(newEmail);
  };
  const propsToPassDown = {
    emailValue,
    fundValue,
    handleClearAlerts,
    handleStripeToken,
    handleZipChange,
    isCreditPaymentOpen,
    isPersonalInfoComplete,
    setFundValue,
    setStripeError,
    setZipValue,
    values,
    zipValue,
  };
  return (
    <Fragment>
      <OverviewWrapper>
        <Amount>{formatDollarAmount(fundedAmount)}</Amount>
        <Funded isFunded={!fundedAmount || !open}>
          {fundedAmount ? 'Funded' : 'Unfunded'}
        </Funded>
      </OverviewWrapper>
      <FundingContainer open={open}>
        <DollarValueWrapper>
          <DollarValueToggle
            fundValue={fundValue}
            handleChange={handleChangeDollarValue}
          />
          - or -
          <StyledPaymentTextInput
            adornmentComponent="$"
            error={!!fundValueError}
            fontSize="1.4rem"
            helperText={fundValueError}
            onBlur={() => handleValidateInput({ field: 'fundValue', values })}
            onChange={e => handleChangeDollarValue(e, e.target.value)}
            value={fundValue}
          />
        </DollarValueWrapper>
        <Divider />
        <PaymentInformationWrapper>
          <StyledLabel>Information</StyledLabel>
          <StyledPaymentTextInput
            adornmentComponent="Email"
            autoComplete="email"
            error={!!emailError}
            fontSize="1rem"
            helperText={emailError}
            onBlur={() => handleValidateInput({ field: 'email', values })}
            onChange={e => handleEmailValueChange(e, e.target.value)}
            value={emailValue}
          />
        </PaymentInformationWrapper>
        <StyledLabel>Payment Methods</StyledLabel>
        <StyledErrorSuccessBanner
          error={stripeError || error}
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
                email: emailValue,
                fundValue,
                handleSubmitAccountPayment,
                isPersonalInfoComplete,
                setFundValue,
                values,
              }}
              title="Your Account"
            />
          )}
          shouldRender={isSignedIn && balance > 0}
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
          propsToPassDown={{
            dispatchPaypalPayment,
            dollarValue: fundValue,
            emailValue,
            handleValidateInput: () =>
              handleValidateInput({ field: 'fundValue', values }),
            initialValue,
            isPaypalPaymentOpen,
            issueId,
            setFundValue,
          }}
          title="Paypal"
        />
      </FundingContainer>
    </Fragment>
  );
};

PaymentView.propTypes = {
  alerts: T.object,
  balance: T.number,
  dispatchPaypalPayment: T.func,
  email: T.string,
  errors: T.object,
  fundedAmount: T.number,
  handleClearPaymentAlerts: T.func,
  handleStripeToken: T.func,
  handleSubmitAccountPayment: T.func,
  handleValidateInput: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  open: T.bool,
};

export default PaymentView;
