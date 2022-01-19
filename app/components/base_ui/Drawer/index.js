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

const addIcon = iconDictionary('addCircle');
const dollarIcon = iconDictionary('dollarSquare');
const helpIcon = iconDictionary('help');
const issueIcon = iconDictionary('issue');
const repoIcon = iconDictionary('repo');
const statsIcon = iconDictionary('stats');
const uploadIcon = iconDictionary('upload');
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
          <ListItem button key="Repos" onClick={() => handleClick('/repos', 1)}>
            <ListItemIcon>{repoIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 1} primary="Repos" />
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
            key="addRepos"
            onClick={() => handleClick('/repos/add', 4)}
          >
            <ListItemIcon>{addIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 4}
              primary="New Repo"
            />
          </ListItem>
        </StyledListWrapper>
        <Divider />
        <StyledListWrapper active={currentValue === 5}>
          <ListItem
            button
            key="howTo"
            onClick={() => handleClick('/how-to', 5)}
          >
            <ListItemIcon>{helpIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 5}
              primary="How It Works"
            />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 6}>
          <ListItem button key="stats" onClick={() => handleClick('/stats', 6)}>
            <ListItemIcon>{statsIcon}</ListItemIcon>
            <StyledListItemText active={currentValue === 6} primary="Stats" />
          </ListItem>
        </StyledListWrapper>
        <StyledListWrapper active={currentValue === 7}>
          <ListItem
            button
            key="job-application"
            onClick={() => handleClick('/jobs/application', 7)}
          >
            <ListItemIcon>{dollarIcon}</ListItemIcon>
            <StyledListItemText
              active={currentValue === 7}
              primary="Get Hired"
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
  location: T.object.isRequired,
  setIsDrawerOpen: T.func,
};

export default BaseDrawer;
