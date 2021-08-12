import React from 'react';
import T from 'prop-types';

import { formatDollarAmount } from 'utils/globalHelpers';

import { StyledRewardWrapper } from './styledComponents';

const RewardWrapper = ({ fundedAmount, ...restProps }) => (
  <StyledRewardWrapper {...restProps}>
    Rewarded {formatDollarAmount(fundedAmount)}
  </StyledRewardWrapper>
);

RewardWrapper.propTypes = { fundedAmount: T.number.isRequired };

export default RewardWrapper;
