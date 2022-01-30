import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { blueColor, whiteColor } from 'defaultStyleHelper';

export const StyledTab = styled(Tab)`
  background: ${whiteColor};
  border-top-left-radius: 0.7rem;
  border-top-right-radius: 0.7rem;
  color: ${blueColor};
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.936rem;
  min-width: auto;
  padding: 0 2rem;
  text-transform: capitalize;

  &.selected {
    background: ${blueColor};
    color: ${whiteColor};
  }
`;

export const StyledTabs = styled(Tabs)`
  border-bottom: 0.2rem solid ${blueColor};
  margin: 0;

  .indicator {
    background-color: ${blueColor};
    height: 0.3rem;
  }

  @media (max-width: 769px) {
    margin-right: 0;
  }
`;
