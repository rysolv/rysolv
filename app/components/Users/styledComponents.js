import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  width: 70%;
  justify-content: center;
  margin: 0.5rem 1rem;
  text-align: center;
  width: 100%;
`;
