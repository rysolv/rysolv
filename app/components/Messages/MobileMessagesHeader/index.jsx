import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  HeaderWrapper,
  LinkWraper,
  StyledIconButton,
  ThreadDescription,
} from './styledComponents';

const BackArrowIcon = iconDictionary('backArrowHalf');

const MobileMessagesHeader = ({ handleNav, isThreadView, threadTitle }) => (
  <ConditionalRender
    Component={<HeaderWrapper>Messages</HeaderWrapper>}
    FallbackComponent={
      <HeaderWrapper>
        <LinkWraper onClick={() => handleNav('/messages')}>
          <StyledIconButton disableRipple>{BackArrowIcon}</StyledIconButton>
          Messages
        </LinkWraper>
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
