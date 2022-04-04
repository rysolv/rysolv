import styled, { css } from 'styled-components';
import Button from '@material-ui/core/Button';

import { PrimaryAsyncButton } from 'components/base_ui';
import Markdown from 'components/Markdown';
import {
  blueColor,
  candidateGreyColor,
  darkBlueColor,
  defaultFontFamily,
  defaultFontSize,
  errorRed,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

const baseInputStyle = css`
  background: ${candidateGreyColor};
  border-radius: 0.7rem;
  border: none;
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
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

export const AdditionalInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonGroup = styled.div`
  background: ${candidateGreyColor};
  display: flex;
  justify-content: right;
  padding: 1rem 2rem;
`;

export const Input = styled.input`
  ${baseInputStyle};
`;

export const ModalContainer = styled.div`
  width: 50rem;

  @media (max-width: 560px) {
    width: auto;
  }
`;

export const ModalContent = styled.div`
  padding: 2rem;
`;

export const ModalHeader = styled.div`
  color: ${blueColor};
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 3.36rem;
`;

export const ModalSubheader = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  line-height: 2.4rem;
  padding: 0.8rem 0 1.6rem;
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
  margin-bottom: 0.4rem;
`;

export const OptionWrapper = styled.div`
  align-items: center;
  display: ${({ $isAbsolute, $isFlex }) =>
    $isAbsolute || $isFlex ? 'flex' : 'block'};
  margin-top: 1rem;
  position: ${({ $isAbsolute }) => ($isAbsolute ? 'absolute' : 'relative')};
  right: 0;
  top: ${({ $isAbsolute }) => ($isAbsolute ? '1rem' : '0')};
  width: ${({ shouldDecreaseWidth }) => (shouldDecreaseWidth ? '48%' : '100%')};
`;

export const SecondaryButton = styled(Button)`
  color: ${darkBlueColor};
  font-family: ${defaultFontFamily};
  font-size: 1.6rem;
  font-weight: 500;
  margin: 1rem;
  padding: 0rem;
  text-transform: none;

  &:hover {
    background-color: transparent;
  }
`;

export const StyledMarkdown = styled(Markdown)`
  .CodeMirror,
  .CodeMirror-scroll {
    max-height: 20rem;
    min-height: 20rem;
  }
`;

export const StyledPrimaryAsyncButton = styled(PrimaryAsyncButton)`
  align-items: center;
  background-color: ${darkBlueColor};
  border-radius: 0.8rem;
  color: ${whiteColor};
  display: flex;
  font-size: 1.6rem;
  font-weight: 700;
  height: 4.8rem;
  line-height: 1.936rem;
  margin: 1rem 0 1rem 1rem;
  min-width: 10rem;
  text-transform: initial;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;
