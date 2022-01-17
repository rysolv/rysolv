import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import {
  IconWrapper,
  LinkWrapper,
  NoMessagesContainer,
  StyledParagraph,
  StyledSubParagraph,
} from './styledComponents';

const NoMessages = ({ isCompany }) => (
  <NoMessagesContainer>
    <IconWrapper src="https://rysolv.s3.us-east-2.amazonaws.com/SuccessUser.png" />
    <StyledParagraph>
      Looks like you don&#39;t have any messages yet.
    </StyledParagraph>
    <ConditionalRender
      Component={
        <StyledSubParagraph>
          <LinkWrapper to="/company/dashboard">
            Connect with a candidate
          </LinkWrapper>
          &nbsp;to get started.
        </StyledSubParagraph>
      }
      FallbackComponent={
        <StyledSubParagraph>
          You&#39;ll receive a notification once a company has matched with you.
        </StyledSubParagraph>
      }
      shouldRender={isCompany}
    />
  </NoMessagesContainer>
);

NoMessages.propTypes = { isCompany: T.bool.isRequired };

export default NoMessages;
