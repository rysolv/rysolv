import styled from 'styled-components';

import { SecondaryButton } from 'components/base_ui';
import {
  codeFontFamily,
  defaultFontSize,
  landingButtonGreen,
  lightBlueColor,
  textColor,
} from 'defaultStyleHelper';

export const Button = styled.div`
  align-items: center;
  background: ${landingButtonGreen};
  border-radius: 0.5rem;
  box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.35);
  color: white;
  display: flex;
  font-weight: 500;
  padding: 1rem;
  width: fit-content;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding-top: 2rem;
  place-content: center;
`;

export const ButtonGroup = styled.div`
  text-align: center;
  width: 100%;
`;

export const CodeInput = styled.textarea`
  background: black;
  color: white;
  font-family: ${codeFontFamily};
  margin: 2rem 0;
  max-height: 22rem;
  min-height: 9rem;
  opacity: 0.87;
  overflow: hidden;
  padding: 1rem;
  resize: none;
  width: 90%;
`;

export const CodeWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

export const EmbedIssueContainer = styled.div`
  color: ${textColor};
  font-size: ${defaultFontSize};
  padding: 2rem;
`;

export const StyledSecondaryButton = styled(SecondaryButton)`
  background-color: white;
  border: 0.1rem solid ${lightBlueColor};
  color: ${lightBlueColor};

  &:hover {
    background-color: white;
  }
`;

export const StyledTitle = styled.h3`
  color: ${textColor};
  font-size: 2rem;
  font-weight: 500;
  margin: 1rem 0;
  text-align: center;
`;

export const LogoWrapper = styled.div`
  padding-right: 1rem;
`;
