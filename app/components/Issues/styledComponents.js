import styled from 'styled-components';
import { textColor, defaultFontSize } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: ${defaultFontSize};
  margin: 1rem 0;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: ${defaultFontSize};
  height: 55rem;
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
  width: 70%;
`;
