import React from 'react';

import {
  EmptyCandidateCardContainer,
  StyledParagraph,
} from './styledComponents';

const EmptyCandidateCard = () => (
  <EmptyCandidateCardContainer>
    <StyledParagraph>No matching candidates.</StyledParagraph>
  </EmptyCandidateCardContainer>
);

export default EmptyCandidateCard;
