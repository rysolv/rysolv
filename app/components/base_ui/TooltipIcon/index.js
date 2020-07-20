import React from 'react';
import T from 'prop-types';

import { StyledTooltip, StyledTooltipLabel } from './styledComponents';

const TooltipIcon = ({
  Icon,
  iconProps,
  Tooltip,
  tooltipContentProps,
  ...restProps
}) => {
  const Component = typeof Icon === 'function' ? <Icon {...iconProps} /> : Icon;
  if (!Tooltip) return Component;
  const TooltipContent =
    typeof Tooltip === 'function' ? (
      <Tooltip {...tooltipContentProps} />
    ) : (
      Tooltip
    );
  return (
    <StyledTooltip
      focusable
      placement="right-start"
      role="tooltip"
      tabIndex="0"
      title={<StyledTooltipLabel>{TooltipContent}</StyledTooltipLabel>}
      {...restProps}
    >
      {Component}
    </StyledTooltip>
  );
};

TooltipIcon.propTypes = {
  Icon: T.oneOfType([T.func, T.element]).isRequired,
  iconProps: T.object,
  Tooltip: T.oneOfType([T.func, T.element]),
  tooltipContentProps: T.object,
};

export default TooltipIcon;
