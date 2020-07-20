import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledCode } from './styledComponents';

const defaultCode = iconDictionary('code');

const CodeIcon = () => <StyledCode>{defaultCode}</StyledCode>;

export default CodeIcon;
