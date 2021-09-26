import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { errorRed, successGreen } from 'defaultStyleHelper';
import iconDictionary from 'utils/iconDictionary';

import MessageSection from './bannerMessage';
import { BannerWrapper, CloseButton, IconWrapper } from './styledComponents';

const CloseIcon = iconDictionary('closeMenu');
const SuccessIcon = iconDictionary('successOutline');
const WarningIcon = iconDictionary('closeCircle');

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

  const successProps = success && { color: successGreen, icon: SuccessIcon };
  const errorProps = error && { color: errorRed, icon: WarningIcon };
  const { color, icon } = successProps || errorProps || {};

  return (
    <BannerWrapper color={color} displayState={displayState} {...restProps}>
      <IconWrapper color={color}>{icon}</IconWrapper>
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
