import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledDownArrow } from './styledComponents';

const dropdownArrow = iconDictionary('dropdownArrow');

const BackIcon = () => <StyledDownArrow>{dropdownArrow}</StyledDownArrow>;

export default BackIcon;
