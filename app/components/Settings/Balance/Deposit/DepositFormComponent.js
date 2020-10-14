/* eslint-disable prettier/prettier */
import React, { Fragment, useEffect, useState } from 'react';
import T from 'prop-types';

import {
  BackNav,
  BaseRadioButtonGroup,
  ConditionalRender,
} from 'components/base_ui';
import { formatDollarAmount } from 'utils/globalHelpers';

import CreditCardPaymentComponent from '../CreditCardPaymentComponent';
import PaypalPaymentComponent from '../PaypalPaymentComponent';
import {
  ChargeBreakdownWrapper,
  ChargeTitle,
  ChargeValue,
  Divider,
  PaymentOptionWrapper,
  PaymentTitle,
  StyledPaymentTextInput,
  StyledText,
  Title,
  Value,
} from '../styledComponents';
import { StyledH3 } from '../../styledComponents';

const DepositFormComponent = ({
  creditCardProps,
  creditCardProps: { setZipValue },
  dispatchPaypalPayment,
  handleClearAllAlerts,
  handleClearErrors,
  handleValidateInput,
  inputErrors: { depositValue: depositValueError },
  setDisplayBottom,
  setStripeError,
}) => {
  const [dollarValue, setDollarValue] = useState('0');
  const [feeValue, setFeeValue] = useState('0');
  const [totalValue, setTotalValue] = useState('0');
  const [paymentType, setPaymentType] = useState('Credit card');
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      handleClearAllAlerts();
      handleClearErrors();
      setDisplayBottom(false);
      setZipValue('');
    };
  }, []);

  const handleChangeDollarValue = e => {
    const { value } = e.target;
    if (value < 1000000) {
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
        setDollarValue(formattedValue);
        setFeeValue((formattedValue * 0.036).toString());
        setTotalValue((formattedValue * 1.036).toString());
      }
      if (formattedString.length === 2) {
        formattedString[0] =
          formattedString[0] === '' ? '0' : formattedString[0];
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setDollarValue(formattedValue);
        setFeeValue((formattedValue * 0.036).toString());
        setTotalValue((formattedValue * 1.036).toString());
      }
    }
  };
  return (
    <Fragment>
      <BackNav label="Back to Account" path="/settings/account" />
      <StyledH3>Enter your funding amount</StyledH3>
      <StyledPaymentTextInput
        adornmentComponent="$"
        error={!!depositValueError}
        helperText={depositValueError}
        onBlur={() =>
          handleValidateInput({
            field: 'depositValue',
            values: { depositValue: dollarValue },
          })
        }
        onChange={e => handleChangeDollarValue(e)}
        textAlign="end"
        type="text"
        value={dollarValue}
      />
      <Divider />
      <StyledH3>Your funding amount</StyledH3>
      <StyledText>
        Rysolv has a 3.6% standard transaction fee to cover credit card / Paypal
        processing and the safe transfer of funds.
      </StyledText>
      <ChargeBreakdownWrapper>
        <ChargeTitle>
          <Title>Funding amount</Title>
          <Title>Transaction fee</Title>
          <Divider />
          <Title>Total due today</Title>
        </ChargeTitle>
        <ChargeValue>
          <Value>{formatDollarAmount(parseFloat(dollarValue, 10))}</Value>
          <Value>{formatDollarAmount(parseFloat(feeValue, 10))}</Value>
          <Divider />
          <Value>{formatDollarAmount(parseFloat(totalValue, 10))}</Value>
        </ChargeValue>
      </ChargeBreakdownWrapper>
      <Divider />
      <PaymentOptionWrapper>
        <PaymentTitle>Pay with</PaymentTitle>
        <BaseRadioButtonGroup
          handleRadioChange={e => setPaymentType(e.target.value)}
          selectedValue={paymentType}
          values={['Credit card', 'PayPal account']}
        />
      </PaymentOptionWrapper>
      <ConditionalRender
        Component={
          <CreditCardPaymentComponent
            amount={dollarValue}
            handleClearAllAlerts={handleClearAllAlerts}
            setStripeError={setStripeError}
            {...creditCardProps}
          />
        }
        FallbackComponent={
          <PaypalPaymentComponent
            dispatchPaypalPayment={dispatchPaypalPayment}
            dollarValue={dollarValue}
            handleValidateInput={handleValidateInput}
          />
        }
        shouldRender={paymentType === 'Credit card'}
      />
    </Fragment>
  );
};

DepositFormComponent.propTypes = {
  creditCardProps: T.object.isRequired,
  dispatchPaypalPayment: T.func.isRequired,
  handleClearAllAlerts: T.func.isRequired,
  handleClearErrors: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  inputErrors: T.object.isRequired,
  setDisplayBottom: T.func.isRequired,
  setStripeError: T.func.isRequired,
};

export default DepositFormComponent;
