import React from 'react';

import {
  CandidateLoadingContainer,
  StyledLoadingIndicator,
  Subtext,
} from './styledComponents';

const CandidateLoadingIndicator = () => (
  <CandidateLoadingContainer>
    <StyledLoadingIndicator />
    <Subtext>Matching candidates...</Subtext>
  </CandidateLoadingContainer>
);

export default CandidateLoadingIndicator;
