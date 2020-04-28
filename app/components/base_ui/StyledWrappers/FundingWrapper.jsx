import React from 'react';
import T from 'prop-types';
import { StyledFundingWrapper } from './styledComponents';

const FundingWrapper = ({ value, open }) => (
  <StyledFundingWrapper open={open}>{value}</StyledFundingWrapper>
);
FundingWrapper.propTypes = {
  open: T.bool,
  value: T.string || T.number,
};

export { FundingWrapper };
