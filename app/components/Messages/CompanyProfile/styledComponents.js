import styled from 'styled-components';

import { lightBlueColor } from 'defaultStyleHelper';

import { CandidateCardContainer } from '../styledComponents';

export const StyledCandidateCardContainer = styled(CandidateCardContainer)`
  margin-bottom: 4rem;
`;

export const WebsiteLink = styled.a`
  color: ${lightBlueColor};
  font-size: 1.6rem;
  padding-bottom: 1.6rem;

  &:hover {
    color: ${lightBlueColor};
  }
`;

export const WebsiteWrapper = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
