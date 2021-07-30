import React, { Fragment } from 'react';

import SuccessUserIcon from 'utils/png/SuccessUser.png';

import {
  IconWrapper,
  LinkWrapper,
  StyledParagraph,
  ViewContainer,
} from './styledComponents';

const ConfirmationView = () => (
  <Fragment>
    <ViewContainer isFinalView>
      <IconWrapper src={SuccessUserIcon} />
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
