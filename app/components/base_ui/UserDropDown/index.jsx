import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';

import {
  StyledAvatar,
  StyledMenu,
  StyledMenuItem,
  StyledMenuContainer,
  IconWrapper,
  StyledUserOverview,
  MenuItemLabel,
  MenuItemValue,
} from './styledComponents';

import { FundingWrapper } from '../StyledWrappers';

const SettingsIcon = iconDictionary('settings');
const ExitIcon = iconDictionary('exit');
const AttemptIcon = iconDictionary('attempt');
const FundedIcon = iconDictionary('funded');
const PullRequestIcon = iconDictionary('pullRequest');

const MenuComponent = props => (
  <StyledMenu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
);

const UserDropDownMenu = ({ anchorEl, handleClose, activeUser }) => {
  const { profilePic, username } = activeUser;
  return (
    <MenuComponent
      anchorEl={anchorEl}
      disableScrollLock
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      onClick={() => handleClose()}
    >
      <StyledMenuContainer>
        <Link to={`/admin/users/detail/${username}`}>
          <StyledUserOverview>
            <StyledAvatar alt={username} src={profilePic} />
            {username}
          </StyledUserOverview>
        </Link>
      </StyledMenuContainer>
      <StyledMenuContainer>
        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{FundedIcon}</IconWrapper>
            Balance:
          </MenuItemLabel>
          <MenuItemValue>
            <FundingWrapper open value="$0.00" />
          </MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          Watch List
          <MenuItemValue> 0</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{AttemptIcon}</IconWrapper>
            Attempting
          </MenuItemLabel>
          <MenuItemValue>0</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{PullRequestIcon}</IconWrapper>
            Pull Requests
          </MenuItemLabel>
          <MenuItemValue>0</MenuItemValue>
        </StyledMenuItem>
      </StyledMenuContainer>

      <StyledMenuItem>
        <MenuItemLabel>
          <IconWrapper>{SettingsIcon}</IconWrapper>
          Settings
        </MenuItemLabel>
      </StyledMenuItem>

      <StyledMenuItem>
        <MenuItemLabel>
          <IconWrapper>{ExitIcon}</IconWrapper>
          Sign out
        </MenuItemLabel>
      </StyledMenuItem>
    </MenuComponent>
  );
};

UserDropDownMenu.propTypes = {
  activeUser: T.object,
  anchorEl: T.object,
  handleClose: T.func,
};
export default UserDropDownMenu;
