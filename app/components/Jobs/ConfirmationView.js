import React, { Fragment } from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  JobsHeader,
  LinkWrapper,
  StyledParagraph,
  ViewContainer,
} from './styledComponents';

const SuccessIcon = iconDictionary('successOutline');

const ConfirmationView = () => (
  <Fragment>
    <JobsHeader />
    <ViewContainer isFinalView>
      <IconWrapper isSuccess>{SuccessIcon}</IconWrapper>
      <StyledParagraph>
        Success! Let&#39;s match you with companies.
      </StyledParagraph>
      <p>
        Someone will be reaching out to you soon. In the meantime, continue
        growing your profile by resolving{' '}
        <LinkWrapper to="/issues">issues</LinkWrapper>.
      </p>
    </ViewContainer>
  </Fragment>
);

export default ConfirmationView;
