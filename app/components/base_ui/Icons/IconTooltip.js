import React from 'react';
import T from 'prop-types';
import { StyledIconTooltip } from './styledComponents';

const IconToolTip = ({ children, toolTipText }) => (
  <StyledIconTooltip title={toolTipText}>{children}</StyledIconTooltip>
);

IconToolTip.propTypes = {
  toolTipText: T.string,
  children: T.element,
};
export default IconToolTip;
