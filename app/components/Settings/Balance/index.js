import React, { useState } from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import DepositComponent from './DepositComponent';
import WithdrawalComponent from './WithdrawalComponent';
import {
  AccountBalanceContainer,
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  BalanceWrapper,
  StyledPaper,
  StyledTab,
  StyledTabs,
} from './styledComponents';

const AccountBalance = ({ balance, dollarsEarned }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <AccountBalanceContainer>
      <BalanceWrapper>
        <BalanceSquare>
          <BalanceTitle>Current earned balance</BalanceTitle>
          <BalanceAmount>
            {dollarsEarned ? formatDollarAmount(dollarsEarned) : '–'}
          </BalanceAmount>
        </BalanceSquare>
        <BalanceSquare>
          <BalanceTitle>Current account balance</BalanceTitle>
          <BalanceAmount>
            {balance ? formatDollarAmount(balance) : '–'}
          </BalanceAmount>
        </BalanceSquare>
      </BalanceWrapper>
      <StyledPaper>
        <StyledTabs
          classes={{ indicator: 'indicator' }}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          <StyledTab classes={{ selected: 'selected' }} label="Deposit" />
          <StyledTab classes={{ selected: 'selected' }} label="Withdrawal" />
        </StyledTabs>
      </StyledPaper>
      {!value ? <DepositComponent /> : <WithdrawalComponent />}
    </AccountBalanceContainer>
  );
};

AccountBalance.propTypes = {
  balance: T.number.isRequired,
  dollarsEarned: T.number.isRequired,
};

export default AccountBalance;
