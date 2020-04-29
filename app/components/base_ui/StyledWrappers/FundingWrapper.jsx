import React from 'react';
import T from 'prop-types';
import { StyledFundingWrapper } from './styledComponents';

const FundingWrapper = ({ value, open, medium }) => (
  <StyledFundingWrapper open={open} medium={medium}>
    {value}
  </StyledFundingWrapper>
);
FundingWrapper.propTypes = {
  medium: T.bool,
  open: T.bool,
  value: T.string || T.number,
};

export { FundingWrapper };
