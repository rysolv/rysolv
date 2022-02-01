import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { PrimaryButton } from 'components/base_ui';
import Markdown from 'components/Markdown';
import {
  blueColor,
  candidateGreyColor,
  darkBlueColor,
  defaultFontFamily,
  textColor,
  whiteColor,
} from 'defaultStyleHelper';

export const ButtonGroup = styled.div`
  background: ${candidateGreyColor};
  display: flex;
  justify-content: right;
  padding: 1rem 2rem;
`;

export const InputError = styled.div``;

export const MarkdownHeader = styled.div`
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.4rem;
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

export const StyledPrimaryButton = styled(PrimaryButton)`
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
