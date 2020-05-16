import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

import { BaseInputWithAdornment } from '../Inputs';

export const HeaderSearchBarContainer = styled.div`
  width: 100%;
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const SearchItemContainer = styled.div`
  display: flex;
  height: 4rem;
  padding: 1rem;
  border-bottom: 0.1rem solid #d5d5d5;

  &:hover {
    background-color: #1e88e5;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledBaseInputWithAdornment = styled(BaseInputWithAdornment)`
  background-color: hsla(0, 0%, 100%, 0.125);
  color: white;

  &.MuiOutlinedInput-root {
    &:active,
    &:focus,
    &:focus-within {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  }
`;

export const StyledSearchDropDown = styled.div`
  background-color: white;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border: 0.1rem solid #d5d5d5;
  color: ${textColor};
  position: absolute;
`;

export const ValueWrapper = styled.div`
  white-space: nowrap;
`;
