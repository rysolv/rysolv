import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import {
  BalanceAmount,
  BalanceTitle,
  BalanceWrapper,
  ConfirmAmount,
  ConfirmContainer,
  ConfirmText,
  ConfirmWrapper,
  StyledPrimaryAsyncButton,
  TextWrapper,
  YourAccountContainer,
} from './styledComponents';

const YourAccountView = ({
  balance,
  email,
  fundValue,
  handleSubmitAccountPayment,
  isPersonalInfoComplete,
  setFundValue,
  values,
}) => {
  const handleSubmit = ({ value }) => {
    handleSubmitAccountPayment({
      email,
      fundValue: value,
      values,
    });
    setFundValue('10');
  };
  const newBalance = balance - fundValue;
  const isNewBalanceNegative = newBalance < 0;
  return (
    <YourAccountContainer>
      <BalanceWrapper>
        <BalanceTitle>Account balance</BalanceTitle>
        <BalanceAmount>
          {balance ? formatDollarAmount(balance) : '–'}
        </BalanceAmount>
      </BalanceWrapper>
      <TextWrapper>
        Fund issue using account balance as your payment method.
      </TextWrapper>
      <ConfirmContainer>
        <ConfirmWrapper>
          <ConfirmText>Funding amount</ConfirmText>
          <ConfirmAmount>{formatDollarAmount(fundValue)}</ConfirmAmount>
        </ConfirmWrapper>
        <ConfirmWrapper isBold>
          <ConfirmText>New account balance</ConfirmText>
          <ConfirmAmount isNegative={isNewBalanceNegative}>
            {formatDollarAmount(balance - fundValue)}
          </ConfirmAmount>
        </ConfirmWrapper>
      </ConfirmContainer>
      <StyledPrimaryAsyncButton
        disabled={
          balance <= 0 ||
          fundValue <= 0 ||
          fundValue === '.' ||
          !isPersonalInfoComplete ||
          newBalance < 0
        }
        label="Confirm"
        onClick={() =>
          handleSubmit({
            value: fundValue,
          })
        }
      />
    </YourAccountContainer>
  );
};
YourAccountView.propTypes = {
  balance: T.number,
  email: T.string.isRequired,
  fundValue: T.oneOfType([T.number, T.string]),
  handleSubmitAccountPayment: T.func,
  isPersonalInfoComplete: T.bool,
  setFundValue: T.func,
  values: T.object,
};

export default YourAccountView;
