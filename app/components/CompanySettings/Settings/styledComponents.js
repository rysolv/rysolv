import styled, { css } from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

import { PrimaryAsyncButton, PrimaryButton } from 'components/base_ui';

import {
  candidateGreyColor,
  darkBlueColor,
  defaultFontSize,
  errorRed,
  grayColor,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

import { mediaQueriesByDevice } from 'utils/breakpoints';

const { mobile } = mediaQueriesByDevice;

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

const baseInputTextStyle = css`
  font-weight: 400;
  line-height: 1.936rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  margin-left: 2rem;
  margin-top: 4.8rem;

  ${mobile} {
    margin: 0;
    align-self: end;
  }
`;

export const Divider = styled.div`
  background: ${grayColor};
  height: 0.1rem;
  margin: 1rem 0 2rem;
  width: 100%;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const InputContainer = styled.div`
  display: flex;
  margin-top: 0.8rem;

  ${mobile} {
    flex-direction: ${({ $isEdit }) => ($isEdit ? 'column' : 'row')};
  }
`;

export const InputDescription = styled.div`
  ${baseInputTextStyle};
  color: #a9acae;
  font-size: 1.4rem;
  margin-top: 1rem;
`;

export const InputError = styled.div`
  color: ${errorRed};
  font-size: ${defaultFontSize};
  height: 2.4rem;
  padding: 0.5rem 0;
`;

export const InputLabel = styled.div`
  ${baseInputTextStyle};
  color: ${textColor};
  font-size: 1.6rem;
  text-transform: capitalize;
`;

export const InputWrapper = styled.div`
  margin-top: 1rem;
  text-align: left;
  width: 100%;
`;

export const StyledIconButton = styled(IconButton)`
  align-self: center;
  display: flex;
  margin-left: 1.6rem;
  margin-top: 2.4rem;
  padding: 0;

  &:hover {
    background: transparent;
  }

  svg {
    color: ${textColor};
    height: 2.4rem;
    width: 2.4rem;
  }
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
    background-color: ${whiteColor};
    color: ${darkBlueColor};
  }
`;
