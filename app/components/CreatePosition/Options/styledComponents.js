import styled, { css } from 'styled-components';

import { BaseAutocomplete } from 'components/base_ui';
import { candidateGreyColor } from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height }) => height};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

export const Autocomplete = styled(BaseAutocomplete)`
  ${baseInputStyle};
  padding: 0;

  .inputRoot {
    &:after,
    &:before {
      border-bottom: none;
    }
    border-bottom: none;
    padding: 0 2.4rem;
  }

  .MuiAutocomplete-clearIndicator {
    display: none;
  }

  .MuiAutocomplete-endAdornment {
    right: 1rem;
  }

  span {
    font-size: 1.6rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const Textarea = styled.textarea`
  ${baseInputStyle};
`;
