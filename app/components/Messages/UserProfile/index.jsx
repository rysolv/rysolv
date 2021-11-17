import React from 'react';
import T from 'prop-types';

import {
  CandidateName,
  ProfilePicture,
  UserProfileContainer,
} from './styledComponents';

const UserProfile = ({ user }) => {
  const { firstName, lastName, profilePic, username } = user;

  return (
    <UserProfileContainer>
      Candidate
      <ProfilePicture src={profilePic} />
      <CandidateName>
        {firstName} {lastName}
      </CandidateName>
      {username}
    </UserProfileContainer>
  );
};

UserProfile.propTypes = {
  user: T.object,
};

export default UserProfile;
