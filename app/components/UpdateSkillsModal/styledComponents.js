import styled, { css } from 'styled-components';

import {
  BaseAutocomplete,
  ErrorSuccessBanner,
  PrimaryAsyncButton,
  PrimaryButton,
} from 'components/base_ui';
import {
  blueColor,
  candidateGreyColor,
  darkBlueColor,
  defaultFontSize,
  errorRed,
  lightBlueColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseButtonStyle = css`
  align-items: center;
  border-radius: 0.8rem;
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 0;
  text-transform: initial;
  width: 10rem;
`;

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

const baseOptionTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const Autocomplete = styled(BaseAutocomplete)`
  ${baseInputStyle};
  align-items: center;
  display: flex;
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

  .MuiFormControl-root {
    margin: 0;
  }

  .MuiInputBase-input {
    font-size: 1.6rem;
  }

  span {
    font-size: 1.6rem;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }

  .tag {
    background-color: #ecf3fc;
    border-radius: 0.7rem;

    &.deletable {
      background-color: #ecf3fc;

      &:focus {
        background-color: #ecf3fc;
      }
    }

    .MuiChip-label {
      color: ${lightBlueColor};
      font-size: ${defaultFontSize};
      font-weight: 400;
    }

    svg {
      color: #a2c6f0;
      height: 2rem;
      width: 2rem;

      &:hover {
        color: #a2c6f0;
      }
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
`;

export const ModalContainer = styled.div`
  padding: 2rem;
  width: 50rem;
`;

export const OptionError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const OptionLabel = styled.div`
  ${baseOptionTextStyle};
  color: ${textColor};
  font-size: 1.6rem;
`;

export const OptionWrapper = styled.div`
  align-items: center;
  display: ${({ $isAbsolute }) => ($isAbsolute ? 'flex' : 'block')};
  margin: 1rem 0;
  position: ${({ $isAbsolute }) => ($isAbsolute ? 'absolute' : 'relative')};
  right: 0;
  top: ${({ $isAbsolute }) => ($isAbsolute ? '1rem' : '0')};
`;

export const StyledErrorSuccessBanner = styled(ErrorSuccessBanner)`
  height: auto;
  margin-bottom: 3rem;
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledPrimaryButton = styled(PrimaryButton)`
  ${baseButtonStyle};
  background-color: ${whiteColor};
  border: 0.2rem solid ${darkBlueColor};
  color: ${darkBlueColor};
  margin-right: 1rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;

export const StyledTitle = styled.h3`
  color: ${blueColor};
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 3.36rem;
  margin: 0;
  padding: 2rem 0 1rem;
`;
