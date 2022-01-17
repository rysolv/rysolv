import React from 'react';
import T from 'prop-types';
import { IconButton as MuiIconButton, Tooltip } from '@material-ui/core';

import { StyledTooltipLabel } from './styledComponents';

const IconButton = ({
  disabled,
  icon,
  label,
  onClick,
  tooltipProps,
  ...restProps
}) => (
  <Tooltip
    title={<StyledTooltipLabel>{label}</StyledTooltipLabel>}
    {...tooltipProps}
  >
    <div>
      <MuiIconButton
        disabled={disabled}
        onClick={onClick}
        size="small"
        {...restProps}
      >
        {icon}
      </MuiIconButton>
    </div>
  </Tooltip>
);

IconButton.defaultProps = { disabled: false, label: '', tooltipProps: {} };

IconButton.propTypes = {
  disabled: T.bool,
  icon: T.object.isRequired,
  label: T.string,
  onClick: T.func.isRequired,
  tooltipProps: T.object,
};

export default IconButton;
