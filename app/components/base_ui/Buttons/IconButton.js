import React from 'react';
import T from 'prop-types';
import { IconButton as MuiIconButton } from '@material-ui/core';

const IconButton = ({
  disabled,
  icon,
  onClick,
  tooltipProps,
  ...restProps
}) => (
  <MuiIconButton
    disabled={disabled}
    onClick={onClick}
    size="small"
    {...restProps}
  >
    {icon}
  </MuiIconButton>
);

IconButton.defaultProps = { disabled: false, tooltipProps: {} };

IconButton.propTypes = {
  disabled: T.bool,
  icon: T.object.isRequired,
  onClick: T.func.isRequired,
  tooltipProps: T.object,
};

export default IconButton;
