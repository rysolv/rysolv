import React, { useEffect } from 'react';
import T from 'prop-types';
import iconDictionary from 'utils/iconDictionary';
import { ConditionalRender } from 'components/base_ui';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { StyledSideNav, StyledListWrapper } from './styledComponents';
import { excludedPath, getInitialValue } from './helpers';

const backArrow = iconDictionary('backArrowHalf');
const forwardArrow = iconDictionary('forwardArrowHalf');
const issueIcon = iconDictionary('issue');
const organizationIcon = iconDictionary('organization');
const userIcon = iconDictionary('user');

const drawerWidth = '15%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const SideNav = ({ handleNav, view }) => {
  const path = window.location.pathname;
  const formattedPath = path.replace(/^\/+/, '');
  const { initialValue } = getInitialValue[formattedPath]
    ? getInitialValue[formattedPath]
    : 0;

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentValue, setCurrentValue] = React.useState(initialValue);
  const [displaySideNav, setDisplaySideNav] = React.useState(
    !excludedPath.includes(formattedPath),
  );
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleClick = (route, tab) => {
    handleNav(route);
    setCurrentValue(tab);
  };

  useEffect(() => {
    switch (view) {
      case 'desktop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        setOpen(true);
        break;
      case 'laptop':
        setDisplaySideNav(!excludedPath.includes(formattedPath));
        setOpen(false);
        break;
      case 'tablet':
        setDisplaySideNav(false);
        break;
      case 'mobileL':
        setDisplaySideNav(false);
        break;
      case 'mobileS':
        setDisplaySideNav(false);
        break;
      default:
        break;
    }
  }, [view]);

  const SideNavComponent = (
    <StyledSideNav>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <Divider />
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
                key="Organizations"
                onClick={() => handleClick('/organizations', 1)}
              >
                <ListItemIcon>{organizationIcon}</ListItemIcon>
                <ListItemText primary="Organizations" />
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
          </List>
          <Divider />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => toggleDrawer()}
          >
            {open ? backArrow : forwardArrow}
          </IconButton>
        </Drawer>
      </div>
    </StyledSideNav>
  );

  return (
    <ConditionalRender
      Component={SideNavComponent}
      shouldRender={displaySideNav}
    />
  );
};

SideNav.propTypes = {
  handleNav: T.func,
  view: T.string,
};

export default SideNav;
