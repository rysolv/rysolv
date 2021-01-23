import React, { Fragment } from 'react';
import T from 'prop-types';

import { StyledIconTooltip, StyledTooltipLabel } from './styledComponents';

const IconToolTip = ({ children, disabled, toolTipText }) => {
  if (disabled) {
    return <Fragment>{children}</Fragment>;
  }
  return (
    <StyledIconTooltip
      title={<StyledTooltipLabel>{toolTipText}</StyledTooltipLabel>}
    >
      {children}
    </StyledIconTooltip>
  );
};

IconToolTip.defaultProps = { disabled: false };

IconToolTip.propTypes = {
  children: T.element,
  disabled: T.bool,
  toolTipText: T.string,
};
export default IconToolTip;
