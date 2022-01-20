import styled, { css } from 'styled-components';

import { ProgressButton } from 'components/base_ui';
import Markdown from 'components/Markdown';
import { darkBlueColor, whiteColor } from 'defaultStyleHelper';

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
  width: 18.4rem;
`;

export const LowerMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
`;

export const StyledMarkdown = styled(Markdown)`
  width: 100%;
`;

export const StyledPrimaryAsyncButton = styled(ProgressButton)`
  ${baseButtonStyle};
  background-color: ${darkBlueColor};
  color: ${whiteColor};
  margin-left: auto;
  margin-top: 2rem;

  &:hover {
    background-color: ${darkBlueColor};
    color: ${whiteColor};
  }
`;
