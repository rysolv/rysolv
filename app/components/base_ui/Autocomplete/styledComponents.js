import styled from 'styled-components';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const StyledAutocomplete = styled(Autocomplete)`
  .inputRoot {
    &:after,
    &:before {
      border-bottom: none;
    }
    border-bottom: 0.1rem solid #cfd8dc;
  }

  label {
    color: #616161;
    font-size: 1.4rem;
  }
`;
