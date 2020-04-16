import React from 'react';
import T from 'prop-types';
import { StyledImage } from './styledComponents';

const ProfileImage = ({ small, alt, detailRoute, handleNav, profilePic }) => (
  <StyledImage
    small={small}
    alt={alt}
    src={profilePic}
    onClick={() => handleNav(detailRoute)}
  />
);

ProfileImage.propTypes = {
  alt: T.string,
  detailRoute: T.string,
  handleNav: T.func,
  profilePic: T.string,
  small: T.bool,
};

export default ProfileImage;
