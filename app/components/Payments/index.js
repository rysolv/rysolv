import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseExpansionPanel } from 'components/base_ui';
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
import {
  Amount,
  Divider,
  DollarValueWrapper,
  Funded,
  Image,
  Name,
  OverviewWrapper,
  PaymentContainer,
  PaymentInformationWrapper,
  StyledBaseInputWithAdornment,
  StyledLabel,
  UsersFunded,
} from './styledComponents';

const CreditCardIcon = iconDictionary('creditCard');
const PaypalIcon = iconDictionary('paypal');

const PaymentPortal = ({
  fundedAmount,
  dispatchVerifyRecaptcha,
  dispatchVerifyRecaptchaFailure,
  handleNav,
  users,
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
        <UsersFunded>
          {users.map(({ amount, image, name }) => (
            <Fragment key={`user-${name}`}>
              <Image src={image} />
              <Name onClick={() => handleNav(`/user/${name}`)}>{name}</Name>
              <div>{formatDollarAmount(amount)}</div>
            </Fragment>
          ))}
        </UsersFunded>
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
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchaFailure: T.func,
  fundedAmount: T.number,
  handleNav: T.func,
  removeBorder: T.bool,
  users: T.array,
};

export default PaymentPortal;
