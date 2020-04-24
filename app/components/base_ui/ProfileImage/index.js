import React from 'react';
import T from 'prop-types';
import { navHelper } from 'utils/globalHelpers';
import { StyledImage } from './styledComponents';

const ProfileImage = ({ small, alt, detailRoute, handleNav, profilePic }) => (
  <a href={detailRoute} onClick={e => navHelper(e, handleNav, detailRoute)}>
    <StyledImage small={small} alt={alt} src={profilePic} />
  </a>
);

ProfileImage.propTypes = {
  alt: T.string,
  detailRoute: T.string,
  handleNav: T.func,
  profilePic: T.string,
  small: T.bool,
};

export default ProfileImage;
