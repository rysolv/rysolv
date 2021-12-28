import React from 'react';

import {
  IconWrapper,
  StyledParagraph,
  StyledSubParagraph,
  UserProfileContainer,
} from './styledComponents';

const UserProfile = () => (
  <UserProfileContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>Coming soon.</StyledParagraph>
    <StyledSubParagraph>
      We are crunching the numbers and building out elaborate charts.
    </StyledSubParagraph>
  </UserProfileContainer>
);

export default UserProfile;
