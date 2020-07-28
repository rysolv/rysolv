import styled from 'styled-components';

import { lightBlueColor, textColor } from 'defaultStyleHelper';

import { BaseInputWithAdornment } from '../Inputs';

export const HeaderSearchBarContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const OptionTitle = styled.button`
  align-items: center;
  background-color: #f6f8fa;
  border-radius: 0.3rem;
  border: 0.1rem solid #cfd8dc;
  color: #6a737d;
  display: flex;
  font-size: 1.2rem;
  height: 2.2rem;
  white-space: nowrap;

  &:hover {
    cursor: pointer;
  }
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const RedirectIcon = styled.span`
  line-height: 1rem;
  padding: 0rem 0.4rem;
`;

export const SearchItemContainer = styled.div`
  border-bottom: 0.1rem solid #d5d5d5;
  display: flex;
  height: 4rem;
  padding: 1rem;

  &:hover {
    background-color: ${lightBlueColor};
    color: white;
    cursor: pointer;
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
      border-bottom-left-radius: ${({ open }) => (open ? '0' : '0.5rem')};
      border-bottom-right-radius: ${({ open }) => (open ? '0' : '0.5rem')};
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
  width: 100%;
`;

export const ValueWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 90%;
`;
