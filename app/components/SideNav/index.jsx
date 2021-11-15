import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import { excludedPath, getInitialValue } from './helpers';
import {
  FixedWrapper,
  StyledIconButton,
  StyledListWrapper,
  StyledSideNav,
} from './styledComponents';

const addIcon = iconDictionary('addCircle');
const backArrow = iconDictionary('backArrowHalf');
const forwardArrow = iconDictionary('forwardArrowHalf');
const issueIcon = iconDictionary('issue');
const repoIcon = iconDictionary('repo');
const uploadIcon = iconDictionary('upload');
const userIcon = iconDictionary('user');

const SideNav = ({ deviceView, handleNav }) => {
  const path = window.location.pathname;
  const rootPath = path.split('/')[1];
  const [open, setOpen] = useState(true);
  const [currentValue, setCurrentValue] = useState(0);
  const [displaySideNav, setDisplaySideNav] = useState(
    !excludedPath.includes(rootPath),
  );

  useEffect(() => {
    const { initialValue } = getInitialValue[rootPath] || 0;
    setCurrentValue(initialValue);
    switch (deviceView) {
      case 'desktopL':
        setDisplaySideNav(!excludedPath.includes(rootPath));
        break;
      case 'desktop':
        setDisplaySideNav(!excludedPath.includes(rootPath));
        break;
      case 'desktopS':
        setDisplaySideNav(!excludedPath.includes(rootPath));
        break;
      case 'laptop':
        setDisplaySideNav(!excludedPath.includes(rootPath));
        break;
      case 'laptopS':
        setDisplaySideNav(!excludedPath.includes(rootPath));
        break;
      case 'tablet':
        setDisplaySideNav(false);
        break;
      case 'mobile':
        setDisplaySideNav(false);
        break;
      case 'mobileS':
        setDisplaySideNav(false);
        break;
      case 'mobileXS':
        setDisplaySideNav(false);
        break;
      case 'mobileXXS':
        setDisplaySideNav(false);
        break;
      default:
        break;
    }
  }, [deviceView, path]);

  useEffect(() => {
    const isDesktop = deviceView === 'desktop' || deviceView === 'desktopL';
    if (isDesktop) setOpen(true);
    else setOpen(false);
  }, [deviceView]);

  const handleClick = (route, tab) => {
    handleNav(route);
    setCurrentValue(tab);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const SideNavComponent = (
    <FixedWrapper open={open}>
      <StyledSideNav open={open}>
        <List>
          <StyledListWrapper active={currentValue === 0}>
            <ListItem
              button
              key="Issues"
              onClick={() => handleClick('/issues', 0)}
            >
              <ListItemIcon>{issueIcon}</ListItemIcon>
              <ListItemText primary="Issues" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 1}>
            <ListItem
              button
              key="Repos"
              onClick={() => handleClick('/repos', 1)}
            >
              <ListItemIcon>{repoIcon}</ListItemIcon>
              <ListItemText primary="Repos" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 2}>
            <ListItem
              button
              key="Users"
              onClick={() => handleClick('/users', 2)}
            >
              <ListItemIcon>{userIcon}</ListItemIcon>
              <ListItemText primary="Users" />
            </ListItem>
          </StyledListWrapper>
          <Divider />
          <StyledListWrapper active={currentValue === 3}>
            <ListItem
              button
              key="addIssues"
              onClick={() => handleClick('/issues/add', 3)}
            >
              <ListItemIcon>{uploadIcon}</ListItemIcon>
              <ListItemText primary="New Issue" />
            </ListItem>
          </StyledListWrapper>
          <StyledListWrapper active={currentValue === 4}>
            <ListItem
              button
              key="addRepos"
              onClick={() => handleClick('/repos/add', 4)}
            >
              <ListItemIcon>{addIcon}</ListItemIcon>
              <ListItemText primary="New Repo" />
            </ListItem>
          </StyledListWrapper>
        </List>
        <StyledIconButton disableRipple onClick={toggleDrawer} open>
          {open ? backArrow : forwardArrow}
        </StyledIconButton>
      </StyledSideNav>
    </FixedWrapper>
  );

  return (
    <ConditionalRender
      Component={SideNavComponent}
      shouldRender={displaySideNav}
    />
  );
};

SideNav.propTypes = {
  deviceView: T.string,
  handleNav: T.func,
};

export default SideNav;
