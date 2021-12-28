import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  HeaderWrapper,
  StyledIconButton,
  ThreadDescription,
} from './styledComponents';

const BackArrowIcon = iconDictionary('backArrowHalf');

const MobileMessagesHeader = ({ handleNav, isThreadView, threadTitle }) => (
  <ConditionalRender
    Component={<HeaderWrapper>Messaging</HeaderWrapper>}
    FallbackComponent={
      <HeaderWrapper>
        <StyledIconButton disableRipple onClick={() => handleNav('/messages')}>
          {BackArrowIcon}
        </StyledIconButton>
        Messaging
        <ThreadDescription>{threadTitle}</ThreadDescription>
      </HeaderWrapper>
    }
    shouldRender={!isThreadView}
  />
);

MobileMessagesHeader.propTypes = {
  handleNav: T.func.isRequired,
  isThreadView: T.bool.isRequired,
  threadTitle: T.string.isRequired,
};

export default MobileMessagesHeader;
