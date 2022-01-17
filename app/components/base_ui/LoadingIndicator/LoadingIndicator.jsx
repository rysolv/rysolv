import React from 'react';
import { CircularProgress } from '@material-ui/core';

import { Wrapper } from './styledComponents';

const LoadingIndicator = props => (
  <Wrapper {...props}>
    <CircularProgress size={50} thickness={8} />
  </Wrapper>
);

export default LoadingIndicator;
