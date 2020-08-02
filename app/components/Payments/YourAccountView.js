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
  emailValue,
  firstNameValue,
  fundValue,
  handleSubmitAccountPayment,
  hasError,
  issueId,
  lastNameValue,
  organizationId,
  setFundValue,
  userId,
}) => {
  const handleSubmit = ({
    fundedIssueId,
    fundedOrganizationId,
    fundingUserId,
    value,
  }) => {
    handleSubmitAccountPayment({
      fundValue: value,
      issueId: fundedIssueId,
      organizationId: fundedOrganizationId,
      userId: fundingUserId,
    });
    setFundValue(0);
  };
  const isPersonalInfoComplete =
    !!emailValue && !!firstNameValue && !!lastNameValue;
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
        disabled={
          balance <= 0 ||
          fundValue <= 0 ||
          fundValue === '.' ||
          hasError ||
          !isPersonalInfoComplete
        }
        label="Confirm"
        onClick={() =>
          handleSubmit({
            fundedIssueId: issueId,
            fundedOrganizationId: organizationId,
            fundingUserId: userId,
            value: fundValue,
          })
        }
      />
    </YourAccountContainer>
  );
};
YourAccountView.propTypes = {
  balance: T.number,
  emailValue: T.string,
  firstNameValue: T.string,
  fundValue: T.oneOfType([T.number, T.string]),
  handleSubmitAccountPayment: T.func,
  hasError: T.bool,
  issueId: T.string,
  lastNameValue: T.string,
  organizationId: T.string,
  setFundValue: T.func,
  userId: T.string,
};

export default YourAccountView;
