import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import MobileMessages from './MobileMessages';
import DesktopMessages from './DesktopMessages';

const Messages = ({ deviceView, ...restProps }) => {
  const [messageBody, setMessageBody] = useState('');

  const isMobileOrTabletOrLaptop =
    deviceView === 'laptop' ||
    deviceView === 'laptopS' ||
    deviceView === 'tablet' ||
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';

  return (
    <ConditionalRender
      Component={DesktopMessages}
      FallbackComponent={MobileMessages}
      propsToPassDown={{
        messageBody,
        setMessageBody,
        ...restProps,
      }}
      shouldRender={!isMobileOrTabletOrLaptop}
    />
  );
};

Messages.propTypes = {
  deviceView: T.string.isRequired,
};

export default Messages;
