import React from 'react';

import {
  IconWrapper,
  NoRecommendedJobsContainer,
  StyledParagraph,
} from './styledComponents';

const NoRecommendedJobs = () => (
  <NoRecommendedJobsContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Looks like you don&#39;t have any recommended jobs yet.
    </StyledParagraph>
  </NoRecommendedJobsContainer>
);

export default NoRecommendedJobs;
