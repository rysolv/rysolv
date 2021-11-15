import React from 'react';

import {
  IconWrapper,
  InitialDashboardContainer,
  LinkWrapper,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const InitialDashboard = () => (
  <InitialDashboardContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Looks like you don&#39;t have any positions yet.
    </StyledParagraph>
    <StyledSubParagraph>
      <LinkWrapper to="/company/dashboard/add-position">
        Create a position
      </LinkWrapper>
      &nbsp;to get started.
    </StyledSubParagraph>
  </InitialDashboardContainer>
);

export default InitialDashboard;
