import React from 'react';
import iconDictionary from 'utils/iconDictionary';
import { StyledSettings } from './styledComponents';

const defaultSettings = iconDictionary('settings');

const Settings = () => <StyledSettings>{defaultSettings}</StyledSettings>;

export default Settings;
