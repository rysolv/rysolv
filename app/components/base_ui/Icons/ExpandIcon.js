import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledExpandIcon } from './styledComponents';

const expandIcon = iconDictionary('expandMore');

const ExpandIcon = ({ ...restProps }) => (
  <StyledExpandIcon {...restProps}>{expandIcon}</StyledExpandIcon>
);

export default ExpandIcon;
