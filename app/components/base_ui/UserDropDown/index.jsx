import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
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
            <IconWrapper>
              <MonetizationOnIcon />
            </IconWrapper>
            Balance:
          </MenuItemLabel>
          <MenuItemValue>$0</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          Watch List
          <MenuItemValue> 0</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>
              <ListAltIcon />
            </IconWrapper>
            Attempting
          </MenuItemLabel>
          <MenuItemValue>0</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>
              <AccountTreeIcon />
            </IconWrapper>
            Pull Requests
          </MenuItemLabel>
          <MenuItemValue>0</MenuItemValue>
        </StyledMenuItem>
      </StyledMenuContainer>

      <StyledMenuItem>
        <MenuItemLabel>
          <IconWrapper>
            <SettingsIcon />
          </IconWrapper>
          Settings
        </MenuItemLabel>
      </StyledMenuItem>

      <StyledMenuItem>
        <MenuItemLabel>
          <IconWrapper>
            <ExitToAppIcon />
          </IconWrapper>
          Sign out
        </MenuItemLabel>
      </StyledMenuItem>
    </MenuComponent>
  );
};

UserDropDownMenu.propTypes = {
  activeUser: T.object,
  anchorEl: T.string,
  handleClose: T.func,
};
export default UserDropDownMenu;
