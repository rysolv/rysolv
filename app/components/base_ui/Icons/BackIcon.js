import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledBack } from './styledComponents';

const defaultBack = iconDictionary('backArrow');

const BackIcon = () => <StyledBack>{defaultBack}</StyledBack>;

export default BackIcon;
