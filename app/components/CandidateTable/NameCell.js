import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import {
  CandidateRowButton,
  CandidateRowLink,
  Name,
  NameBottomSection,
  NameTopSection,
  ProfilePic,
  StyledTableCell,
} from './styledComponents';

const PeopleIcon = iconDictionary('people');

const NameCell = ({ handleNav, name, profilePic, resume, username }) => (
  <StyledTableCell>
    <NameTopSection>
      <ProfilePic src={profilePic} />
      <Name>{name}</Name>
    </NameTopSection>
    <NameBottomSection>
      <CandidateRowButton onClick={() => handleNav(`/users/${username}`)}>
        {PeopleIcon} View candidate
      </CandidateRowButton>
      <ConditionalRender
        Component={
          <Fragment>
            <span>/</span>
            <CandidateRowLink href={resume} target="_blank">
              resume
            </CandidateRowLink>
          </Fragment>
        }
        shouldRender={!!resume}
      />
    </NameBottomSection>
  </StyledTableCell>
);

NameCell.propTypes = {
  handleNav: T.func.isRequired,
  name: T.string.isRequired,
  profilePic: T.string.isRequired,
  resume: T.string,
  username: T.string.isRequired,
};

export default NameCell;
