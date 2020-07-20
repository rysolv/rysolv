import React from 'react';
import T from 'prop-types';

import { StyledIconTooltip, StyledTooltipLabel } from './styledComponents';

const IconToolTip = ({ children, toolTipText }) => (
  <StyledIconTooltip
    title={<StyledTooltipLabel>{toolTipText}</StyledTooltipLabel>}
  >
    {children}
  </StyledIconTooltip>
);

IconToolTip.propTypes = {
  toolTipText: T.string,
  children: T.element,
};
export default IconToolTip;
