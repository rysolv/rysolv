import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import DepositComponent from './Deposit';
// import StatementsComponent from './Statements';
import WithdrawalComponent from './Withdrawal';
// import WorkHistoryComponent from './WorkHistory';
import {
  AccountBalanceContainer,
  BalanceAmount,
  BalanceSquare,
  BalanceTitle,
  BalanceWrapper,
  FundingContainer,
  // StyledPaper,
  // StyledTab,
  // StyledTabs,
} from './styledComponents';

const AccountBalance = ({
  balance,
  dollarsEarned,
  handleNav,
  setDisplayBottom,
}) => (
  // const [value, setValue] = useState(0);
  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const ComponentToRender = {
  //   0: <StatementsComponent />,
  //   1: <WorkHistoryComponent />,
  // };
  <AccountBalanceContainer>
    <BalanceWrapper>
      <BalanceSquare>
        <BalanceTitle>Lifetime earnings</BalanceTitle>
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
    <FundingContainer>
      <DepositComponent
        handleNav={handleNav}
        setDisplayBottom={setDisplayBottom}
      />
      <WithdrawalComponent
        handleNav={handleNav}
        setDisplayBottom={setDisplayBottom}
      />
    </FundingContainer>
    {/* <StyledPaper>
        <StyledTabs
          classes={{ indicator: 'indicator' }}
          indicatorColor="primary"
          onChange={handleChange}
          textColor="primary"
          value={value}
        >
          <StyledTab classes={{ selected: 'selected' }} label="Statements" />
          <StyledTab classes={{ selected: 'selected' }} label="Work History" />
        </StyledTabs>
      </StyledPaper>
      {ComponentToRender[value]} */}
  </AccountBalanceContainer>
);

AccountBalance.propTypes = {
  balance: T.number.isRequired,
  dollarsEarned: T.number.isRequired,
  handleNav: T.func.isRequired,
  setDisplayBottom: T.func.isRequired,
};

export default AccountBalance;
