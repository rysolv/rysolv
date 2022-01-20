import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DesktopMessages from './DesktopMessages';
import MobileMessages from './MobileMessages';
import TabletMessages from './TabletMessages';

const Messages = ({ deviceView, ...restProps }) => {
  const [messageBody, setMessageBody] = useState('');

  let ComponentToRender;
  console.log(deviceView);

  if (['desktopL', 'desktop', 'desktopS'].includes(deviceView)) {
    ComponentToRender = DesktopMessages;
  } else if (['laptop', 'laptopS', 'tablet'].includes(deviceView)) {
    ComponentToRender = TabletMessages;
  } else {
    ComponentToRender = MobileMessages;
  }

  return (
    <ConditionalRender
      Component={ComponentToRender}
      FallbackComponent={TabletMessages}
      propsToPassDown={{
        messageBody,
        setMessageBody,
        ...restProps,
      }}
      shouldRender
    />
  );
};

Messages.propTypes = {
  deviceView: T.string.isRequired,
};

export default Messages;
