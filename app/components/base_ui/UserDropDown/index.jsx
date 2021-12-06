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
const BountyIcon = iconDictionary('gift');
const ExitIcon = iconDictionary('exit');
const FundedIcon = iconDictionary('funded');
const IssueIcon = iconDictionary('issue');
const PullRequestIcon = iconDictionary('pullRequest');
const RepoIcon = iconDictionary('repo');
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
  handleNav,
  handleSignout,
}) => {
  const {
    attempting,
    balance,
    bounties,
    issues,
    notifications,
    profilePic,
    pullRequests,
    repos,
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
        <Link to="/settings">
          <StyledUserOverview>
            <StyledAvatar alt={username} src={profilePic} />
            {username}
          </StyledUserOverview>
        </Link>
      </StyledMenuContainer>
      <StyledMenuContainer>
        <StyledMenuItem onClick={() => handleNav('/settings/account')}>
          <MenuItemLabel>
            <IconWrapper>{FundedIcon}</IconWrapper>
            Balance:
          </MenuItemLabel>
          <MenuItemValue>
            <FundingWrapper open value={formatDollarAmount(balance)} />
          </MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem
          notifications={notifications}
          onClick={() => handleNav('/settings/bounties')}
        >
          <MenuItemLabel>
            <IconWrapper>{BountyIcon}</IconWrapper>
            Bounties
          </MenuItemLabel>
          <MenuItemValue>{bounties ? bounties.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleNav('/settings')}>
          <MenuItemLabel>
            <IconWrapper>
              <MonocleIcon />
            </IconWrapper>
            Watch List
          </MenuItemLabel>
          <MenuItemValue> {watching ? watching.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleNav('/settings')}>
          <MenuItemLabel>
            <IconWrapper>{AttemptIcon}</IconWrapper>
            Attempting
          </MenuItemLabel>
          <MenuItemValue>{attempting ? attempting.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleNav('/settings/pullrequests')}>
          <MenuItemLabel>
            <IconWrapper>{PullRequestIcon}</IconWrapper>
            Pull Requests
          </MenuItemLabel>
          <MenuItemValue>
            {pullRequests ? pullRequests.length : 0}
          </MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleNav('/settings/issues')}>
          <MenuItemLabel>
            <IconWrapper>{IssueIcon}</IconWrapper>
            Issues
          </MenuItemLabel>
          <MenuItemValue>{issues ? issues.length : 0}</MenuItemValue>
        </StyledMenuItem>

        <StyledMenuItem onClick={() => handleNav('/settings/repos')}>
          <MenuItemLabel>
            <IconWrapper>{RepoIcon}</IconWrapper>
            Repos
          </MenuItemLabel>
          <MenuItemValue>{repos ? repos.length : 0}</MenuItemValue>
        </StyledMenuItem>
      </StyledMenuContainer>

      <StyledMenuItem onClick={() => handleNav('/settings')}>
        <MenuItemLabel>
          <IconWrapper>{SettingsIcon}</IconWrapper>
          Settings
        </MenuItemLabel>
      </StyledMenuItem>

      <StyledMenuItem onClick={handleSignout}>
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
  handleNav: T.func,
  handleSignout: T.func,
};

export default UserDropDownMenu;
