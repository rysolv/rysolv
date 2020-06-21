import React, { useState } from 'react';
import T from 'prop-types';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import iconDictionary from 'utils/iconDictionary';

import {
  StyledDrawer,
  StyledList,
  StyledListItemText,
  StyledListWrapper,
} from './styledComponents';

const addIcon = iconDictionary('addCircle');
const issueIcon = iconDictionary('issue');
const organizationIcon = iconDictionary('organization');
const userIcon = iconDictionary('user');
const uploadIcon = iconDictionary('upload');

const BaseDrawer = ({
  handleNav,
  isDrawerOpen,
  isSignedIn,
  setIsDrawerOpen,
}) => {
  const [currentValue, setCurrentValue] = useState(0);

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
          <ListItem button key="Users" onClick={() => handleClick('/users', 2)}>
            <ListItemIcon>{userIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 2} primary="Users" />
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
            <StyledListItemText
              active={currentValue === 3}
              primary="New Issue"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 4}>
          <ListItem
            button
            key="addOrganizations"
            onClick={() => handleClick('/organizations/add', 4)}
          >
            <ListItemIcon>{addIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 4}
              primary="New Organization"
            />
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
  setIsDrawerOpen: T.func,
};

export default BaseDrawer;
