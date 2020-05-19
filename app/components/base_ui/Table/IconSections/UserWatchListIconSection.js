import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import { IconButton } from '../../Buttons';
import { IconContainer } from '../styledComponents';

const editIcon = iconDictionary('edit');

const UserWatchListIconSection = () => (
  <IconContainer>
    <IconButton icon={editIcon} label="Edit" onClick={() => {}} />
  </IconContainer>
);

UserWatchListIconSection.propTypes = {};

export default UserWatchListIconSection;
