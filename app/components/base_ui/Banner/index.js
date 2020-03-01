import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { BannerWrapper, CloseButton, IconWrapper } from './styledComponents';
import MessageSection from './bannerMessage';

const CloseIcon = iconDictionary('closeMenu');
const SuccessIcon = iconDictionary('successOutline');
const WarningIcon = iconDictionary('warning');

const ErrorSuccessBanner = ({ error, onClose, success, ...restProps }) => {
  const errorSuccessMessages = success || error;
  const [displayState, setDisplayState] = useState(!!errorSuccessMessages);
  useEffect(() => setDisplayState(!!errorSuccessMessages), [
    errorSuccessMessages,
  ]);

  const handleClose = () => {
    setDisplayState(false);
    if (onClose) {
      const field = error ? 'error' : 'success';
      onClose(field);
    }
  };

  const successProps = success && { color: 'green', icon: SuccessIcon };
  const errorProps = error && { color: 'red', icon: WarningIcon };
  const { color, icon } = successProps || errorProps || {};

  return (
    <BannerWrapper color={color} displayState={displayState} {...restProps}>
      <IconWrapper>{icon}</IconWrapper>
      <MessageSection messages={errorSuccessMessages} />
      <CloseButton aria-label="Close" Icon={CloseIcon} onClick={handleClose} />
    </BannerWrapper>
  );
};

ErrorSuccessBanner.propTypes = {
  error: T.oneOfType([T.bool, T.object]),
  onClose: T.func,
  success: T.oneOfType([T.bool, T.object]),
};

export default ErrorSuccessBanner;
