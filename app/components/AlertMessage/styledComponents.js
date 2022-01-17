import styled from 'styled-components';

import { defaultFontSize, textColor } from 'defaultStyleHelper';

export const Content = styled.section`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const IconWrapper = styled.div`
  align-self: center;
  color: #c62828;
  height: 10rem;
  width: 10rem;
`;

export const MainText = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  padding-top: 2rem;
`;

export const MessageContainer = styled.section`
  align-self: center;
  background: white;
  color: ${textColor};
  display: flex;
  flex-direction: column;
  font-size: ${defaultFontSize};
  margin-top: 5rem;
  min-height: 50rem;
  padding: 3.8rem 2.6rem;
  text-align: center;
  width: 90%;
`;

export const Text = styled.p``;
