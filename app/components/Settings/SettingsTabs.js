import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import Tabs from '@material-ui/core/Tabs';

import UserTimelineView from './Timeline';
import UserAccount from './Account';
import { StyledPaper, StyledTab } from './styledComponents';

const SettingsTabs = ({
  attempting,
  balance,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  currentTab,
  email,
  filterValues,
  firstName,
  fundedAmount,
  handleClose,
  handleDeleteUser,
  handleDone,
  handleEdit,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  isDisabled,
  lastName,
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
        email={email}
        firstName={firstName}
        fundedAmount={fundedAmount}
        handleClose={handleClose}
        handleDeleteUser={handleDeleteUser}
        handleDone={handleDone}
        handleEdit={handleEdit}
        isDisabled={isDisabled}
        lastName={lastName}
        setChangeEmail={setChangeEmail}
        setChangeFirstName={setChangeFirstName}
        setChangeLastName={setChangeLastName}
        setChangeUsername={setChangeUsername}
        setValue={setValue}
        userId={userId}
        username={username}
        value={value}
      />
    ),
  };
  return (
    <StyledPaper>
      <Tabs
        indicatorColor="primary"
        onChange={handleChangeTab}
        textColor="primary"
        value={tab}
      >
        <StyledTab label="Overview" />
        <StyledTab label="Account" />
        <StyledTab label="Issues" />
        <StyledTab label="Organizations" />
        <StyledTab label="Pull Requests" />
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
  email: T.string,
  filterValues: T.object,
  firstName: T.string,
  fundedAmount: T.number,
  handleClose: T.func,
  handleDeleteUser: T.func,
  handleDone: T.func,
  handleEdit: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleRemoveIssue: T.func,
  isDisabled: T.bool,
  lastName: T.string,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setValue: T.func,
  userId: T.string,
  username: T.string,
  value: T.string,
  watching: T.array,
};

export default SettingsTabs;
