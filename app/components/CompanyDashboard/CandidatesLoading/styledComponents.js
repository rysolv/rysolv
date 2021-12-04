import styled from 'styled-components';

import { darkBlueColor } from 'defaultStyleHelper';

export const CandidateLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10rem 0;
  text-align: center;
`;

export const Title = styled.p`
  color: ${darkBlueColor};
  font-size: 2.4rem;
  font-weight: 700;
`;
