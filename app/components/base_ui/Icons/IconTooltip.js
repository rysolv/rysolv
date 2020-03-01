import React from 'react';
import T from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';

const IconToolTip = ({ children, toolTipText }) => (
  <Tooltip title={toolTipText} style={{ display: 'inline-block' }}>
    {children}
  </Tooltip>
);

IconToolTip.propTypes = {
  toolTipText: T.string,
  children: T.element,
};
export default IconToolTip;
