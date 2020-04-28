import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledMonocleIcon } from './styledComponents';

const defaultMonocle = iconDictionary('monocle');

const MonocleIcon = () => (
  <StyledMonocleIcon>{defaultMonocle}</StyledMonocleIcon>
);

export default MonocleIcon;
