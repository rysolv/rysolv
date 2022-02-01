import styled from 'styled-components';

import { grayColor } from 'defaultStyleHelper';

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 4rem;
`;

export const ThreadWrapper = styled.div`
  display: flex;
  width: 72%;
`;

export const VerticalDivider = styled.div`
  background: ${grayColor};
  height: 100%;
  margin-right: 4rem;
  width: 0.1rem;
`;
