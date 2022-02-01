import React from 'react';

import {
  IconWrapper,
  NoJobsListContainer,
  StyledParagraph,
} from './styledComponents';

const NoJobsList = () => (
  <NoJobsListContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Oh no! Looks like there are no jobs matching the criteria.
    </StyledParagraph>
  </NoJobsListContainer>
);

export default NoJobsList;
