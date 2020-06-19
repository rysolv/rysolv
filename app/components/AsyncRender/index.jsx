import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { LoadingIndicator } from '../base_ui';

const AsyncRender = ({
  asyncData,
  component,
  error,
  FallbackComponent,
  isRequiredData,
  loading,
  propsToPassDown,
}) => {
  if (loading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <div>Error loading, please refresh the page.</div>;
  }
  // Should be false but, at the moment, true due to lack of data
  if (!isRequiredData || !isEmpty(asyncData)) {
    const ComponentToRender = component;
    return <ComponentToRender data={asyncData} {...propsToPassDown} />;
  }
  if (FallbackComponent) {
    return <FallbackComponent />;
  }
  return <div>Please contact customer support at (860) 491-7218</div>;
};

AsyncRender.defaultProps = { isRequiredData: false, propsToPassDown: {} };

AsyncRender.propTypes = {
  asyncData: T.oneOfType([T.array, T.object]),
  component: T.oneOfType([T.func, T.object]),
  error: T.oneOfType([T.object, T.bool]),
  FallbackComponent: T.oneOfType([T.func, T.object]),
  isRequiredData: T.bool,
  loading: T.bool,
  propsToPassDown: T.object,
};

export default AsyncRender;
