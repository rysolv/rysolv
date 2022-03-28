import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  NameBottomSection,
  CandidateRowButton,
  NameWrapper,
  ProfilePicWrapper,
  StyledTableCell,
} from './styledComponents';

const PeopleIcon = iconDictionary('people');

const NameCell = ({ handleNav, name, profilePic, username }) => (
  <StyledTableCell>
    <div>
      <ProfilePicWrapper src={profilePic} />
      <NameWrapper>{name}</NameWrapper>
    </div>
    <NameBottomSection>
      <CandidateRowButton onClick={() => handleNav(`/users/${username}`)}>
        {PeopleIcon} View candidate
      </CandidateRowButton>
      <span>/</span>
      <CandidateRowButton onClick={() => handleNav(`/users/${username}`)}>
        resume
      </CandidateRowButton>
    </NameBottomSection>
  </StyledTableCell>
);

NameCell.propTypes = {
  handleNav: T.func.isRequired,
  name: T.string.isRequired,
  profilePic: T.string.isRequired,
  username: T.string.isRequired,
};

export default NameCell;
