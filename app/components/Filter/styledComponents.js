import styled from 'styled-components';

import { textColor } from 'defaultStyleHelper';

export const FilterContainer = styled.div`
  background-color: white;
  border-radius: 0.2rem;
  border: 0.1rem solid #cfd8dc;
  display: flex;
  flex-direction: column;
  margin: 2rem;
  padding: 1rem;
`;

export const StyledLabel = styled.h4`
  color: #6a737d;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 0 0 0.5rem 0;
`;

export const StyledTitle = styled.h2`
  color: ${textColor};
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 1.2;
  margin: 1rem 0 2rem 0;
`;
