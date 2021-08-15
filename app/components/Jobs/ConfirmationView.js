import React, { Fragment } from 'react';

import {
  IconWrapper,
  LinkWrapper,
  StyledParagraph,
  ViewContainer,
} from './styledComponents';

const ConfirmationView = () => (
  <Fragment>
    <ViewContainer isFinalView>
      <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
      <StyledParagraph>
        Success! Let&#39;s match you with companies.
      </StyledParagraph>
      <p>
        Someone will be reaching out to you soon. In the meantime, continue
        growing your profile by resolving{' '}
        <LinkWrapper to="/issues">issues</LinkWrapper>. See how we{' '}
        <LinkWrapper to="/how-we-score-code">score candidates</LinkWrapper>.
      </p>
    </ViewContainer>
  </Fragment>
);

export default ConfirmationView;
