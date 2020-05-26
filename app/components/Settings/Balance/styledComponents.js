import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const AccountBalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const BalanceAmount = styled.h3`
  color: rgba(0, 0, 0, 0.87);
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
`;

export const BalanceSquare = styled.div`
  background-color: #f6f8fa;
  border-radius: 0.3rem;
  padding: 1.6rem 2.4rem;
  width: 45%;
`;

export const BalanceTitle = styled.span`
  color: #586069;
  font-size: ${defaultFontSize};
  font-weight: 400;
  line-height: 1.5;
  word-wrap: break-word;
`;

export const BalanceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const DepositText = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;

export const StyledPaper = styled(Paper)`
  border-bottom: 0.1rem solid lightgrey;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
`;

export const StyledTab = styled(Tab)`
  color: ${textColor};
  font-size: ${defaultFontSize};
  min-width: 9rem;
  padding: 0.6rem;
  text-transform: capitalize;

  &.selected {
    color: ${textColor};
    font-weight: 600;
  }
`;

export const StyledTabs = styled(Tabs)`
  .indicator {
    background-color: transparent;
  }
`;

export const WithdrawalText = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem 0;
`;
