import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { inputFieldColor } from 'defaultStyleHelper';

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
    color: rgba(0, 0, 0, 0.7);
    display: flex;
    font-weight: 700;
    line-height: 1.5;
    padding: 0.25rem 0.4rem;
  }

  label {
    color: #616161;
    font-size: 1.4rem;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;
