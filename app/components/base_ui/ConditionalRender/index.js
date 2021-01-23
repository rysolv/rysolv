import React from 'react';
import T from 'prop-types';

function ConditionalRender({
  Component,
  FallbackComponent,
  propsToPassDown,
  shouldRender,
}) {
  if (shouldRender) {
    if (typeof Component === 'function') {
      return <Component {...propsToPassDown} />;
    }
    return Component;
  }
  if (FallbackComponent) {
    if (typeof FallbackComponent === 'function') {
      return <FallbackComponent {...propsToPassDown} />;
    }
    return FallbackComponent;
  }
  return null;
}

ConditionalRender.propTypes = {
  Component: T.oneOfType([T.element, T.func]),
  FallbackComponent: T.oneOfType([T.element, T.func]),
  propsToPassDown: T.object,
  shouldRender: T.bool,
};

export default ConditionalRender;
