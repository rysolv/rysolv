import React, { useState } from 'react';
import T from 'prop-types';

import DesktopMessages from './DesktopMessages';
import MobileMessages from './MobileMessages';
import TabletMessages from './TabletMessages';

const Messages = ({ deviceView, ...restProps }) => {
  const [messageBody, setMessageBody] = useState('');

  let ComponentToRender;

  if (['desktopL', 'desktop', 'desktopS'].includes(deviceView)) {
    ComponentToRender = DesktopMessages;
  } else if (['laptop', 'laptopS', 'tablet'].includes(deviceView)) {
    ComponentToRender = TabletMessages;
  } else {
    ComponentToRender = MobileMessages;
  }

  return (
    <ComponentToRender
      messageBody={messageBody}
      setMessageBody={setMessageBody}
      {...restProps}
    />
  );
};

Messages.propTypes = { deviceView: T.string.isRequired };

export default Messages;
