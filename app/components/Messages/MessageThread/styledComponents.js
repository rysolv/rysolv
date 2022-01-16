import styled, { css } from 'styled-components';

import { ProgressButton } from 'components/base_ui';
import Markdown from 'components/Markdown';
import {
  candidateGreyColor,
  darkBlueColor,
  defaultFontSize,
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
  width: 18.4rem;
`;

export const BodyWrapper = styled.div`
  background: ${({ active }) => (active ? whiteColor : candidateGreyColor)};
  border-radius: 0.7rem;
  border: 0.2rem solid ${candidateGreyColor};
  color: ${textColor};
  font-size: 1.6rem;
  font-weight: 400;
  height: ${({ height, multiple }) => (multiple ? 'auto' : height)};
  line-height: 1.936rem;
  margin: 0.8rem;
  min-height: ${({ height, multiple }) => (multiple ? height : 'auto')};
  padding: 1.6rem 2.4rem;
  transform: matrix(1, 0, 0, 1, 0, 0);
  width: 70%;
  max-width: 40rem;
`;

export const LowerMessage = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 1rem;
  margin-top: 2rem;
`;

export const MessageCard = styled.div`
  align-items: center;
  color: ${textColor};
  display: flex;
  flex-direction: ${({ active }) => (active ? `row` : `row-reverse`)};
  font-size: ${defaultFontSize};
  justify-content: ${({ active }) => (active ? `end` : `start`)};
  padding: ${({ active }) => (active ? `1rem` : `1rem 1rem 1rem 0`)};
  width: 100%;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70%;
  overflow-y: auto;
  width: 100%;
`;

export const MessageDate = styled.div`
  white-space: nowrap;
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const MessageBody = styled.div``;

export const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: calc(100% - 25rem);
`;

export const ProfilePicture = styled.img`
  border-radius: 50%;
  height: 4rem;
  width: 4rem;
`;

export const StyledMarkdown = styled(Markdown)`
  min-height: 21.3rem;
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

export const Username = styled.div`
  font-weight: 700;
  margin-right: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
