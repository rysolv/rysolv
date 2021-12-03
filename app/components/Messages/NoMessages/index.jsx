import React from 'react';

import {
  IconWrapper,
  LinkWrapper,
  NoMessagesContainer,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const NoMessages = () => (
  <NoMessagesContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Looks like you don&#39;t have any messages yet.
    </StyledParagraph>
    <StyledSubParagraph>
      <LinkWrapper to="/company/dashboard">
        Connect with a candidate
      </LinkWrapper>
      &nbsp;to get started.
    </StyledSubParagraph>
  </NoMessagesContainer>
);

export default NoMessages;
