/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
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
  StyledAccountBaseInput,
  StyledPrimaryAsyncButton,
  TextWrapper,
  YourAccountContainer,
} from './styledComponents';

const YourAccountView = ({
  balance,
  handleSubmitAccountPayment,
  issueId,
  userId,
}) => {
  const [fundValue, setFundValue] = useState(0);

  const handleChangeDollarValue = e => {
    const { value } = e.target;
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
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
    }
  };

  const handleSubmit = ({ fundedIssueId, fundingUserId, value }) => {
    handleSubmitAccountPayment({
      fundValue: value,
      issueId: fundedIssueId,
      userId: fundingUserId,
    });
    setFundValue(0);
  };
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
      <StyledAccountBaseInput
        adornmentComponent="$"
        fontSize="1.4rem"
        onChange={e => handleChangeDollarValue(e)}
        value={fundValue}
      />
      <ConfirmContainer>
        <ConfirmWrapper>
          <ConfirmText>Funding amount</ConfirmText>
          <ConfirmAmount>{formatDollarAmount(fundValue)}</ConfirmAmount>
        </ConfirmWrapper>
        <ConfirmWrapper isBold>
          <ConfirmText>New account balance</ConfirmText>
          <ConfirmAmount>{formatDollarAmount(balance - fundValue)}</ConfirmAmount>
        </ConfirmWrapper>
      </ConfirmContainer>
      <StyledPrimaryAsyncButton
        disabled={fundValue === 0}
        label="Confirm"
        onClick={() =>
          handleSubmit({
            value: fundValue,
            fundedIssueId: issueId,
            fundingUserId: userId,
          })
        }
      />
    </YourAccountContainer>
  );
};
YourAccountView.propTypes = {
  balance: T.number,
  handleSubmitAccountPayment: T.func,
  issueId: T.string,
  userId: T.string,
};

export default YourAccountView;
