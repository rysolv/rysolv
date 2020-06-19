import React from 'react';
import T from 'prop-types';
import { IconButton as MuiIconButton, Tooltip } from '@material-ui/core';

const IconButton = ({
  disabled,
  icon,
  label,
  onClick,
  tooltipProps,
  ...restProps
}) => (
  <Tooltip title={label} {...tooltipProps}>
    <MuiIconButton
      disabled={disabled}
      onClick={onClick}
      size="small"
      {...restProps}
    >
      {icon}
    </MuiIconButton>
  </Tooltip>
);

IconButton.propTypes = {
  disabled: T.bool,
  icon: T.object.isRequired,
  label: T.string.isRequired,
  onClick: T.func.isRequired,
  tooltipProps: T.object,
};

export default IconButton;
