import React from 'react';
import T from 'prop-types';
import { Star, DownArrow } from '../Icons';

import {
  StyledUserNavBar,
  StyledAvatar,
  NumberContainer,
  IconWrapper,
} from './styledComponents';

const UserNavBar = ({ username, profilePic, rep }) => (
  <StyledUserNavBar>
    <IconWrapper>
      <Star />
      <NumberContainer>{rep}</NumberContainer>
    </IconWrapper>
    <StyledAvatar alt={username} src={profilePic} />
    <DownArrow />
  </StyledUserNavBar>
);

UserNavBar.propTypes = {
  username: T.string,
  profilePic: T.string,
  rep: T.number,
};

export default UserNavBar;
