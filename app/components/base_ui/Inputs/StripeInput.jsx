/* eslint-disable no-return-assign */
import React, { useImperativeHandle, useRef } from 'react';
import T from 'prop-types';

const StripeInput = ({ component: Component, inputRef, ...restProps }) => {
  const elementRef = useRef();
  useImperativeHandle(inputRef, () => ({
    focus: () => elementRef.current.focus,
  }));
  return (
    <Component
      onReady={element => (elementRef.current = element)}
      {...restProps}
    />
  );
};

StripeInput.propTypes = {
  component: T.func,
  inputRef: T.func,
};

export default StripeInput;
