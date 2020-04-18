import React, { Fragment, useState } from 'react';
import T from 'prop-types';

import { BaseExpansionPanel } from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';
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
  amountFunded,
  dispatchVerifyRecaptcha,
  dispatchVerifyRecaptchaFailure,
  handleNav,
  isFunded,
  users,
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
  const handleCreditCardNumberChange = (event, newCreditCardNumber) => {
    const formattedNumber = newCreditCardNumber.replace(/[^0-9]/g, '');
    if (formattedNumber.length > 4 && formattedNumber.length <= 8) {
      setCreditCardNumber(
        `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(4)}`,
      );
    } else if (formattedNumber.length > 8 && formattedNumber.length <= 12) {
      setCreditCardNumber(
        `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(
          4,
          8,
        )} ${formattedNumber.slice(8)}`,
      );
    } else if (formattedNumber.length > 12 && formattedNumber.length <= 16) {
      setCreditCardNumber(
        `${formattedNumber.slice(0, 4)} ${formattedNumber.slice(
          4,
          8,
        )} ${formattedNumber.slice(8, 12)} ${formattedNumber.slice(12)}`,
      );
    } else {
      setCreditCardNumber(formattedNumber);
    }
  };
  const handleDateChange = (event, newDate) => {
    const formattedDate = newDate.replace(/[^0-9]/g, '');
    if (formattedDate.length > 2 && formattedDate.length <= 6) {
      setDateValue(`${formattedDate.slice(0, 2)}/${formattedDate.slice(2)}`);
    } else {
      setDateValue(formattedDate);
    }
  };
  const handleCvcChange = (event, newCvc) => {
    const formattedCvc = newCvc.replace(/[^0-9]/g, '');
    setCvcValue(formattedCvc);
  };
  const handleZipChange = (event, newZip) => {
    const formattedZip = newZip.replace(/[^0-9]/g, '');
    setZipValue(formattedZip);
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
    zipValue,
  };
  return (
    <PaymentContainer>
      <OverviewWrapper>
        <Amount>{formatDollarAmount(amountFunded)}</Amount>
        <Funded>{isFunded ? 'Funded' : 'Unfunded'}</Funded>
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
  amountFunded: T.string,
  dispatchVerifyRecaptcha: T.func,
  dispatchVerifyRecaptchaFailure: T.func,
  handleNav: T.func,
  isFunded: T.bool,
  users: T.array,
};

export default PaymentPortal;
