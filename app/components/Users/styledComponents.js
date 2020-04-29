import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const UserCardWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-wrap: wrap;
`;

export const UserWrapper = styled.div`
  display: flex;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  justify-content: center;
  text-align: center;
`;
