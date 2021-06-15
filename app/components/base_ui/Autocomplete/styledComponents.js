import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Typography from '@material-ui/core/Typography';

import {
  defaultFontSize,
  inputFieldColor,
  textColor,
} from 'defaultStyleHelper';

export const StyledAutocomplete = styled(Autocomplete)`
  padding-right: 2rem;

  .inputRoot {
    &:after,
    &:before {
      border-bottom: none;
    }
    border-bottom: 0.1rem solid ${inputFieldColor};
  }

  .tag {
    background-color: rgb(237, 238, 240);
    border-radius: 0.25rem;
    color: ${textColor};
    display: flex;
    font-weight: 700;
    line-height: 1.5;
    padding: 0.25rem 0.4rem;
  }

  span {
    color: #616161;
    font-size: ${defaultFontSize};
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

export const StyledOption = styled(Typography)`
  font-size: ${defaultFontSize};
`;
