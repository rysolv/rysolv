import React from 'react';
import T from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ErrorIcon from '@material-ui/icons/Error';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import WebIcon from '@material-ui/icons/Web';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 500,
  },
});

export default function SubHeader({ initialValue, handleNav }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialValue);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        handleNav('/issues');
        break;
      case 1:
        handleNav('/organizations');
        break;
      case 2:
        handleNav('/users');
        break;
      default:
        break;
    }
  };

  SubHeader.propTypes = {
    initialValue: T.number,
    handleNav: T.func,
  };

  return (
    <Paper square className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
        aria-label="icon label tabs example"
      >
        <Tab icon={<ErrorIcon />} label="ISSUES" />
        <Tab icon={<WebIcon />} label="ORGANIZATIONS" />
        <Tab icon={<AccountCircleIcon />} label="USERS" />
      </Tabs>
    </Paper>
  );
}
