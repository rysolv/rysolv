import React from 'react';
import T from 'prop-types';
import { navHelper } from 'utils/globalHelpers';
import { StyledImage } from './styledComponents';

const ProfileImage = ({ alt, detailRoute, handleNav, profilePic, size }) => (
  <a href={detailRoute} onClick={e => navHelper(e, handleNav, detailRoute)}>
    <StyledImage alt={alt} size={size} src={profilePic} />
  </a>
);

ProfileImage.propTypes = {
  alt: T.string,
  detailRoute: T.string,
  handleNav: T.func,
  profilePic: T.string,
  size: T.string,
};

export default ProfileImage;
