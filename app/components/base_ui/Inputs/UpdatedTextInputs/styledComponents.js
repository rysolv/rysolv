import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import {
  candidateGreyColor,
  darkBlueColor,
  defaultFontSize,
  errorRed,
  textColor,
} from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height }) => height};
  line-height: 1.936rem;
  margin-top: 0.8rem;
  min-height: ${({ height }) => height};
  outline: none;
  overflow: hidden;
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 100%;
`;

const baseTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  text-align: left;
`;

export const InputError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const InputLabel = styled.div`
  ${baseTextStyle};
  color: ${textColor};
  font-size: 1.6rem;
`;

export const InputLine = styled.div`
  background-color: ${({ isActive }) => (isActive ? darkBlueColor : '#a9acae')};
  height: ${({ isActive }) => (isActive ? '0.2rem' : '0.1rem')};
  margin-top: ${({ isActive }) => (isActive ? '0.5rem' : '0')};
  width: 4.8rem;
`;

export const InputLineContainer = styled.div`
  margin: 0 0.5rem;
  width: 4.8rem;
`;

export const InputText = styled.div`
  height: 2.6rem;
  margin-bottom: 0.7rem;
  text-align: center;
  width: 4.8rem;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const PasscodeInputContainer = styled.div`
  align-items: center;
  display: flex;
  position: relative;
`;

export const StyledIconButton = styled(IconButton)`
  padding: 0;
  position: absolute;
  right: 1rem;
  top: 40%;

  svg {
    height: 2.4rem;
    width: 2.4rem;
  }
`;

export const StyledInput = styled.input`
  font-size: 1.6rem;
  height: 4.8rem;
  opacity: 0;
  position: absolute;
  width: ${({ maxLength }) => `${48 * maxLength + 10 * maxLength}`}px;
  z-index: 1;
`;
