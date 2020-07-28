import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledStar } from './styledComponents';

const starIcon = iconDictionary('star');

const Star = ({ ...restProps }) => (
  <StyledStar {...restProps}>{starIcon}</StyledStar>
);

export default Star;
