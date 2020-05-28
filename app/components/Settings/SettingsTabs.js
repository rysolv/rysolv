import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

import UserAccount from './Account';
import UserIssues from './Issues';
import UserOrganizations from './Organizations';
import UserTimelineView from './Timeline';
import { StyledPaper, StyledTab } from './styledComponents';

const SettingsTabs = ({
  attempting,
  balance,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  currentTab,
  dispatchOpenModal,
  dollarsEarned,
  email,
  filterValues,
  firstName,
  handleClose,
  handleDone,
  handleEdit,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  isDisabled,
  issues,
  lastName,
  organizations,
  setChangeEmail,
  setChangeFirstName,
  setChangeLastName,
  setChangeUsername,
  setValue,
  userId,
  username,
  value,
  watching,
}) => {
  const [tab, setTab] = useState(currentTab);
  useEffect(() => setValue(currentTab), [currentTab]);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const ComponentToRender = {
    0: (
      <UserTimelineView
        attempting={attempting}
        filterValues={filterValues}
        handleInputChange={handleInputChange}
        handleNav={handleNav}
        handleRemoveIssue={handleRemoveIssue}
        userId={userId}
        watching={watching}
      />
    ),
    1: (
      <UserAccount
        balance={balance}
        changeEmail={changeEmail}
        changeFirstName={changeFirstName}
        changeLastName={changeLastName}
        changeUsername={changeUsername}
        dispatchOpenModal={dispatchOpenModal}
        dollarsEarned={dollarsEarned}
        email={email}
        firstName={firstName}
        handleClose={handleClose}
        handleDone={handleDone}
        handleEdit={handleEdit}
        handleNav={handleNav}
        isDisabled={isDisabled}
        lastName={lastName}
        setChangeEmail={setChangeEmail}
        setChangeFirstName={setChangeFirstName}
        setChangeLastName={setChangeLastName}
        setChangeUsername={setChangeUsername}
        setValue={setValue}
        username={username}
        value={value}
      />
    ),
    2: <UserIssues handleNav={handleNav} issues={issues} />,
    3: (
      <UserOrganizations handleNav={handleNav} organizations={organizations} />
    ),
  };
  return (
    <StyledPaper>
      <Tabs
        centered
        indicatorColor="primary"
        onChange={handleChangeTab}
        textColor="primary"
        value={tab}
      >
        <StyledTab
          label="Overview"
          onClick={() => handleNav('/settings/overview')}
        />
        <StyledTab
          label="Account"
          onClick={() => handleNav('/settings/account')}
        />
        <StyledTab
          label="Issues"
          onClick={() => handleNav('/settings/issues')}
        />
        <StyledTab
          label="Organizations"
          onClick={() => handleNav('/settings/organizations')}
        />
        <StyledTab
          label="Pull Requests"
          onClick={() => handleNav('/settings/pullrequests')}
        />
      </Tabs>
      {ComponentToRender[tab]}
    </StyledPaper>
  );
};

SettingsTabs.propTypes = {
  attempting: T.array,
  balance: T.number,
  changeEmail: T.bool,
  changeFirstName: T.bool,
  changeLastName: T.bool,
  changeUsername: T.bool,
  currentTab: T.number,
  dispatchOpenModal: T.func,
  dollarsEarned: T.number,
  email: T.string,
  filterValues: T.object,
  firstName: T.string,
  handleClose: T.func,
  handleDone: T.func,
  handleEdit: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleRemoveIssue: T.func,
  isDisabled: T.bool,
  issues: T.array,
  lastName: T.string,
  organizations: T.array,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setValue: T.func,
  userId: T.string,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
  watching: T.array,
};

export default SettingsTabs;
