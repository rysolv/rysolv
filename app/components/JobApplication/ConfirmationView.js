import React from 'react';

import {
  IconWrapper,
  LinkWrapper,
  StyledParagraph,
  ViewContainer,
} from './styledComponents';

const ConfirmationView = () => (
  <ViewContainer isFinalView>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Success! Let&#39;s match you with companies.
    </StyledParagraph>
    <p>
      We have received your responses and you should start hearing from
      companies soon! In the meantime, check out your&nbsp;
      <LinkWrapper to="/dashboard">dashboard</LinkWrapper> for recommended jobs
      and tips to build your profile. Or head over to&nbsp;
      <LinkWrapper to="/jobs">jobs</LinkWrapper> to start applying.
    </p>
  </ViewContainer>
);

export default ConfirmationView;
