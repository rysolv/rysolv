import styled from 'styled-components';

import { borderColor, detailFontSize } from 'defaultStyleHelper';

export const RepoCard = styled.div`
  border-radius: 0.2rem;
  border: 0.1rem solid ${borderColor};
  margin: 0.5rem 0;
  padding: 1rem;
`;

export const StyledExistingRepos = styled.div`
  font-size: ${detailFontSize};
  padding: 0 3rem;
  text-align: center;
  width: 100%;
`;
