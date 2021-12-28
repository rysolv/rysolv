import styled from 'styled-components';

import {
  blueColor,
  defaultFontSize,
  lightBlueColor,
  whiteColor,
} from 'defaultStyleHelper';

export const ConversationCard = styled.button`
  background-color: ${({ isSelected }) =>
    isSelected ? blueColor : whiteColor};
  border: none;
  color: ${({ isSelected }) => (isSelected ? whiteColor : blueColor)};
  font-size: 1.6rem;
  font-weight: 700;
  letter-spacing: -0.025rem;
  line-height: 1.936rem;
  padding: 2rem 1rem 2rem 2rem;
  position: relative;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${blueColor};
    color: ${whiteColor};
    cursor: pointer;
  }

  svg {
    font-size: 1.6rem;
    margin-right: 0.8rem;
  }
`;

export const MessageDate = styled.div`
  font-weight: 400;
  white-space: nowrap;
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const MessageSnippit = styled.div`
  color: #a9acae;
  font-size: ${defaultFontSize};
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Recipient = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Unread = styled.div`
  color: ${lightBlueColor};
  display: ${({ unread }) => (unread ? `inline-flex` : `none`)};
  font-size: 1.6rem;
  left: 0.5rem;
  position: absolute;
`;
