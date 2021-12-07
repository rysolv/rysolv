import React from 'react';
import T from 'prop-types';

import {
  IconWrapper,
  InitialDashboardContainer,
  LinkWrapper,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const ClosedDashboard = ({ selectedPosition }) => (
  <InitialDashboardContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>Looks like the position is closed.</StyledParagraph>
    <StyledSubParagraph>
      <LinkWrapper
        to={`/company/dashboard/edit-position?id=${selectedPosition}`}
      >
        Open position
      </LinkWrapper>
      &nbsp;to match with candidates.
    </StyledSubParagraph>
  </InitialDashboardContainer>
);

ClosedDashboard.propTypes = { selectedPosition: T.string.isRequired };

export default ClosedDashboard;
