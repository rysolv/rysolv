import React from 'react';
import T from 'prop-types';

import { LoadingIndicator } from '../base_ui';

const AsyncLoad = ({ error }) => {
  if (error) {
    return <div>{error}</div>;
  }
  return <LoadingIndicator />;
};

AsyncLoad.defaultProps = { error: false };

AsyncLoad.propTypes = { error: T.oneOfType([T.bool, T.object]) };

export default AsyncLoad;
