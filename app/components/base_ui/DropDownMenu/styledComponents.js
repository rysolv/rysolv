import styled from 'styled-components';
import DropDownMenu from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const StyledDropDownMenu = styled(DropDownMenu)`
  background-color: white;
  border-radius: 0.5rem;
  border: 0.1rem solid #d5d5d5;
  color: ${textColor};
  font-size: ${defaultFontSize};
  height: 3rem;
  padding: 1rem;

  .select {
    &:focus {
      background-color: transparent;
    }
  }

  svg {
    height: 2.4rem;
    width: 1.4rem;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  color: ${textColor};
  font-size: ${defaultFontSize};
`;
