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
  fundValue,
  handleSubmitAccountPayment,
  issueId,
  setFundValue,
  userId,
}) => {
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
      <ConfirmContainer>
        <ConfirmWrapper>
          <ConfirmText>Funding amount</ConfirmText>
          <ConfirmAmount>{formatDollarAmount(fundValue)}</ConfirmAmount>
        </ConfirmWrapper>
        <ConfirmWrapper isBold>
          <ConfirmText>New account balance</ConfirmText>
          <ConfirmAmount>
            {formatDollarAmount(balance - fundValue)}
          </ConfirmAmount>
        </ConfirmWrapper>
      </ConfirmContainer>
      <StyledPrimaryAsyncButton
        disabled={balance <= 0 || fundValue <= 0 || fundValue === '.'}
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
  fundValue: T.oneOfType([T.number, T.string]),
  handleSubmitAccountPayment: T.func,
  issueId: T.string,
  setFundValue: T.func,
  userId: T.string,
};

export default YourAccountView;
