import React from 'react';
import T from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { LoadingIndicator } from '../base_ui';

const AsyncRender = ({
  asyncData,
  component,
  error,
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
  if (!isEmpty(asyncData)) {
    const ComponentToRender = component;
    return <ComponentToRender data={asyncData} {...propsToPassDown} />;
  }
  return <div>Please contact customer support for further assistance.</div>;
};

AsyncRender.defaultProps = { propsToPassDown: {} };

AsyncRender.propTypes = {
  asyncData: T.oneOfType([T.array, T.object]),
  component: T.oneOfType([T.func, T.object]),
  error: T.oneOfType([T.object, T.bool]),
  loading: T.bool,
  propsToPassDown: T.object,
};

export default AsyncRender;
