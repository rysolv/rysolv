import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import { defaultFontSize, hoverLinkColor, textColor } from 'defaultStyleHelper';

export const StyledPaper = styled(Paper)`
  border-radius: 0;
  box-shadow: none;
  width: fit-content;
`;

export const StyledTab = styled(Tab)`
  border-bottom: 0.3rem solid lightgrey;
  color: ${textColor};
  font-size: ${defaultFontSize};
  min-width: 9rem;
  padding: 0.6rem;
  text-transform: capitalize;

  &:hover {
    color: ${hoverLinkColor};
  }

  &.selected {
    color: ${textColor};

    &:hover {
      color: ${hoverLinkColor};
    }
  }
`;

export const StyledTabs = styled(Tabs)`
  .indicator {
    background-color: ${hoverLinkColor};
    height: 0.3rem;
  }
`;
