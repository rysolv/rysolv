import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledComment } from './styledComponents';

const defaultMonocle = iconDictionary('monocle');

const MonocleIcon = () => <StyledComment>{defaultMonocle}</StyledComment>;

export default MonocleIcon;
