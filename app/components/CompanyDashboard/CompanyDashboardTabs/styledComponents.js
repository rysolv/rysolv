import styled from 'styled-components';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { blueColor, grayColor } from 'defaultStyleHelper';

export const StyledTab = styled(Tab)`
  color: ${blueColor};
  font-size: 1.6rem;

  &.selected {
    color: ${blueColor};
    font-weight: 700;
  }
`;

export const StyledTabs = styled(Tabs)`
  border-bottom: 0.1rem solid ${grayColor};
  margin: 0 1rem;

  .indicator {
    background-color: ${blueColor};
    height: 0.3rem;
  }

  @media (max-width: 769px) {
    margin-right: 0;
  }
`;
