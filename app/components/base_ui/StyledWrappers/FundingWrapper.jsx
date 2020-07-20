import React from 'react';
import T from 'prop-types';

import { StyledFundingWrapper } from './styledComponents';

const FundingWrapper = ({ medium, open, value, ...restProps }) => (
  <StyledFundingWrapper medium={medium} open={open} {...restProps}>
    {value}
  </StyledFundingWrapper>
);
FundingWrapper.propTypes = {
  medium: T.bool,
  open: T.bool,
  value: T.string || T.number,
};

export { FundingWrapper };
