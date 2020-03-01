import React from 'react';
import iconDictionary from 'utils/iconDictionary';
import { StyledVerified } from './styledComponents';

const defaultVerified = iconDictionary('verified');

const Settings = () => <StyledVerified>{defaultVerified}</StyledVerified>;

export default Settings;
