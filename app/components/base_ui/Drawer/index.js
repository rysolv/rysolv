import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import iconDictionary from 'utils/iconDictionary';

import pathnameDictionary from './pathnameDictionary';
import {
  StyledDrawer,
  StyledList,
  StyledListItemText,
  StyledListWrapper,
} from './styledComponents';

const helpIcon = iconDictionary('help');
const issueIcon = iconDictionary('issue');
const newIssueIcon = iconDictionary('upload');
const newOrganizationIcon = iconDictionary('addCircle');
const newProjectIcon = iconDictionary('newProject');
const organizationIcon = iconDictionary('organization');
const projectIcon = iconDictionary('project');
const statsIcon = iconDictionary('stats');
const userIcon = iconDictionary('user');

const BaseDrawer = ({
  handleNav,
  isDrawerOpen,
  isSignedIn,
  location: { pathname },
  setIsDrawerOpen,
}) => {
  const value = pathnameDictionary[pathname];
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => setCurrentValue(pathnameDictionary[pathname]), [pathname]);

  const handleClick = (route, tab) => {
    handleNav(route);
    setCurrentValue(tab);
    setIsDrawerOpen();
  };
  return (
    <StyledDrawer open={isDrawerOpen} onClose={setIsDrawerOpen}>
      <StyledList isSignedIn={isSignedIn}>
        <StyledListWrapper active={currentValue === 0}>
          <ListItem
            button
            key="Issues"
            onClick={() => handleClick('/issues', 0)}
          >
            <ListItemIcon>{issueIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 0} primary="Issues" />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 1}>
          <ListItem
            button
            key="Organizations"
            onClick={() => handleClick('/organizations', 1)}
          >
            <ListItemIcon>{organizationIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 1}
              primary="Organizations"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 2}>
          <ListItem
            button
            key="Projects"
            onClick={() => handleClick('/projects', 2)}
          >
            <ListItemIcon>{projectIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 2}
              primary="Projects"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 3}>
          <ListItem button key="Users" onClick={() => handleClick('/users', 3)}>
            <ListItemIcon>{userIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 3} primary="Users" />
          </ListItem>
        </StyledListWrapper>
        <Divider />
        <StyledListWrapper active={currentValue === 4}>
          <ListItem
            button
            key="addIssues"
            onClick={() => handleClick('/issues/add', 4)}
          >
            <ListItemIcon>{newIssueIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 4}
              primary="New Issue"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 5}>
          <ListItem
            button
            key="addOrganizations"
            onClick={() => handleClick('/organizations/add', 5)}
          >
            <ListItemIcon>{newOrganizationIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 5}
              primary="New Organization"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 6}>
          <ListItem
            button
            key="addProjects"
            onClick={() => handleClick('/projects/add', 6)}
          >
            <ListItemIcon>{newProjectIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 6}
              primary="New Project"
            />
          </ListItem>
        </StyledListWrapper>
        <Divider />
        <StyledListWrapper active={currentValue === 7}>
          <ListItem
            button
            key="howTo"
            onClick={() => handleClick('/how-to', 7)}
          >
            <ListItemIcon>{helpIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 7}
              primary="How It Works"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 8}>
          <ListItem button key="stats" onClick={() => handleClick('/stats', 8)}>
            <ListItemIcon>{statsIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 8} primary="Stats" />
          </ListItem>
        </StyledListWrapper>
      </StyledList>
    </StyledDrawer>
  );
};

BaseDrawer.propTypes = {
  handleNav: T.func,
  isDrawerOpen: T.bool,
  isSignedIn: T.bool,
  location: T.object.isRequired,
  setIsDrawerOpen: T.func,
};

export default BaseDrawer;
