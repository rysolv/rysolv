import React from 'react';
import { Link } from 'react-router-dom';
import T from 'prop-types';
import { formatDollarAmount } from 'utils/globalHelpers';

import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  MenuItemLabel,
  MenuItemValue,
  StyledAvatar,
  StyledMenu,
  StyledMenuContainer,
  StyledMenuItem,
  StyledUserOverview,
} from './styledComponents';

import { FundingWrapper } from '../StyledWrappers';
import { MonocleIcon } from '../Icons';

const AttemptIcon = iconDictionary('attempt');
const ExitIcon = iconDictionary('exit');
const FundedIcon = iconDictionary('funded');
const IssueIcon = iconDictionary('issue');
const OrganizationIcon = iconDictionary('organization');
const PullRequestIcon = iconDictionary('pullRequest');
const SettingsIcon = iconDictionary('settings');

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

const UserDropDownMenu = ({
  activeUser,
  anchorEl,
  handleClose,
  handleSignout,
}) => {
  const {
    attempting,
    balance,
    id,
    issues,
    organizations,
    profilePic,
    pullRequests,
    username,
    watching,
  } = activeUser;
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
        <Link to={`/users/detail/${id}`}>
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
            <FundingWrapper open value={formatDollarAmount(balance)} />
          </MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>
              <MonocleIcon />
            </IconWrapper>
            Watch List
          </MenuItemLabel>
          <MenuItemValue> {watching ? watching.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{AttemptIcon}</IconWrapper>
            Attempting
          </MenuItemLabel>
          <MenuItemValue>{attempting ? attempting.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{PullRequestIcon}</IconWrapper>
            Pull Requests
          </MenuItemLabel>
          <MenuItemValue>
            {pullRequests ? pullRequests.length : 0}
          </MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{IssueIcon}</IconWrapper>
            Issues
          </MenuItemLabel>
          <MenuItemValue>{issues ? issues.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem>
          <MenuItemLabel>
            <IconWrapper>{OrganizationIcon}</IconWrapper>
            Organizations
          </MenuItemLabel>
          <MenuItemValue>
            {organizations ? organizations.length : 0}
          </MenuItemValue>
        </StyledMenuItem>
      </StyledMenuContainer>

      <StyledMenuItem>
        <MenuItemLabel>
          <IconWrapper>{SettingsIcon}</IconWrapper>
          Settings
        </MenuItemLabel>
      </StyledMenuItem>

      <StyledMenuItem onClick={() => handleSignout({ userId: id })}>
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
  handleSignout: T.func,
};
export default UserDropDownMenu;
