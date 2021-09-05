import React from 'react';

import {
  EmptyCandidateCardContainer,
  StyledParagraph,
} from './styledComponents';

const EmptyCandidateCard = () => (
  <EmptyCandidateCardContainer>
    <StyledParagraph>
      No candidates have been found yet fitting the job requirements.
    </StyledParagraph>
  </EmptyCandidateCardContainer>
);

export default EmptyCandidateCard;
