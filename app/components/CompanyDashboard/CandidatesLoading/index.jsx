/* eslint-disable react/no-array-index-key */
import React from 'react';
import { LoadingIndicator } from 'components/base_ui';

import { CandidateLoadingContainer, Title } from './styledComponents';

const CandidateLoadingIndicator = () => (
  <CandidateLoadingContainer>
    <LoadingIndicator />
    <Title>Matching Candidates</Title>
  </CandidateLoadingContainer>
);

export default CandidateLoadingIndicator;
