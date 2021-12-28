import React from 'react';
import T from 'prop-types';

import {
  IconWrapper,
  NoRecommendedIssuesContainer,
  StyledButton,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const NoRecommendedIssues = ({ dispatchOpenModal }) => (
  <NoRecommendedIssuesContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Looks like you don&#39;t have any recommended issues yet.
    </StyledParagraph>
    <StyledSubParagraph>
      <StyledButton
        disableRipple
        onClick={() => dispatchOpenModal({ modalState: 'updateSkills' })}
      >
        Add more skills
      </StyledButton>
      &nbsp;to see more issues.
    </StyledSubParagraph>
  </NoRecommendedIssuesContainer>
);

NoRecommendedIssues.propTypes = { dispatchOpenModal: T.func.isRequired };

export default NoRecommendedIssues;
