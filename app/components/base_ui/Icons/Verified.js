import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { StyledVerified } from './styledComponents';

const defaultVerified = iconDictionary('verified');

const Verified = () => <StyledVerified>{defaultVerified}</StyledVerified>;

export default Verified;
