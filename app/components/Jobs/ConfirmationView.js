import React, { Fragment } from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  JobsHeader,
  LinkWrapper,
  MiddleParagraph,
  TopParagraph,
  ViewContainer,
} from './styledComponents';

const SuccessIcon = iconDictionary('successOutline');

const ConfirmationView = () => (
  <Fragment>
    <JobsHeader />
    <ViewContainer isFinalView>
      <IconWrapper isSuccess>{SuccessIcon}</IconWrapper>
      <TopParagraph>Success! Let&#39;s match you with companies.</TopParagraph>
      <MiddleParagraph>
        Someone will be reaching out to you soon. In the meantime, continue
        growing your profile by resolving{' '}
        <LinkWrapper to="/issues">issues</LinkWrapper>.
      </MiddleParagraph>
    </ViewContainer>
  </Fragment>
);

export default ConfirmationView;
