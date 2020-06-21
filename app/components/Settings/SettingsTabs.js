import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import UserAccount from './Account';
import UserAttempting from './Attempting';
import DepositFormComponent from './Balance/Deposit/DepositFormComponent';
import WithdrawalFormComponent from './Balance/Withdrawal/WithdrawalFormComponent';
import UserIssues from './Issues';
import UserOrganizations from './Organizations';
import UserTimelineView from './Timeline';
import UserWatching from './Watching';
import {
  StyledPaper,
  StyledPopper,
  StyledTab,
  StyledTabs,
  TabItem,
  TabItemBorder,
} from './styledComponents';

const SettingsTabs = ({
  activity,
  attempting,
  balance,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  creditCardProps,
  currentTab,
  deviceView,
  dispatchOpenModal,
  displayBottom,
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
  setDisplayBottom,
  setValue,
  userId,
  username,
  value,
  view,
  watching,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tab, setTab] = useState(currentTab);
  const [tabsInMenu, setTabsInMenu] = useState([
    'Organizations',
    'Pull Requests',
  ]);

  useEffect(() => setValue(currentTab), [currentTab]);

  useEffect(() => {
    if (deviceView === 'tablet') {
      setTabsInMenu(['Issues', 'Organizations', 'Pull Requests']);
    }
    if (deviceView === 'desktopS') {
      setTabsInMenu(['Organizations', 'Pull Requests']);
    }
    if (deviceView === 'desktop') {
      setTabsInMenu(['Pull Requests']);
    }
  }, [deviceView]);

  const isMobileOrTablet =
    deviceView === 'tablet' ||
    deviceView === 'mobile' ||
    deviceView === 'mobileS' ||
    deviceView === 'mobileXS' ||
    deviceView === 'mobileXXS';
  const isMobileOrTabletOrLaptop =
    isMobileOrTablet ||
    deviceView === 'laptopS' ||
    deviceView === 'laptop' ||
    deviceView === 'desktopS';
  const isDesktopL = deviceView === 'desktopL';
  const openMenu = Boolean(anchorEl);

  const handleClick = (newVal, route) => {
    setTab(newVal);
    handleNav(route);
    setAnchorEl(null);
  };

  const handeOpenMenu = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const BalanceFormComponent = (
    <ConditionalRender
      Component={
        <DepositFormComponent
          creditCardProps={creditCardProps}
          handleNav={handleNav}
          setDisplayBottom={setDisplayBottom}
        />
      }
      FallbackComponent={
        <WithdrawalFormComponent
          balance={balance}
          handleNav={handleNav}
          setDisplayBottom={setDisplayBottom}
        />
      }
      shouldRender={view === 'deposit'}
    />
  );
  const ListComponent = (
    <ConditionalRender
      Component={
        <UserAttempting
          attempting={attempting}
          handleNav={handleNav}
          handleRemoveIssue={handleRemoveIssue}
          userId={userId}
        />
      }
      FallbackComponent={
        <UserWatching
          handleNav={handleNav}
          handleRemoveIssue={handleRemoveIssue}
          userId={userId}
          watching={watching}
        />
      }
      shouldRender={view === 'attempting'}
    />
  );
  const SecondarySettingsComponent = (
    <ConditionalRender
      Component={ListComponent}
      FallbackComponent={BalanceFormComponent}
      shouldRender={view === 'attempting' || view === 'watching'}
    />
  );
  const ComponentToRender = {
    0: (
      <UserTimelineView
        activity={activity}
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
        setDisplayBottom={setDisplayBottom}
        setValue={setValue}
        username={username}
        value={value}
      />
    ),
    2: <UserIssues handleNav={handleNav} issues={issues} />,
    3: (
      <UserOrganizations handleNav={handleNav} organizations={organizations} />
    ),
    4: <div />,
  };
  const TabMenu = () => (
    <StyledPopper anchorEl={anchorEl} open={openMenu} placement="bottom-start">
      {tabsInMenu.map((newTab, index) => {
        const tabIndex = 5 - tabsInMenu.length + index;
        return (
          <TabItemBorder
            key={`tab-item-${newTab}`}
            isActive={currentTab === tabIndex}
          >
            <TabItem
              onClick={() =>
                handleClick(
                  tabIndex,
                  `/settings/${newTab.toLowerCase().replace(/\s/g, '')}`,
                )
              }
            >
              {newTab}
            </TabItem>
          </TabItemBorder>
        );
      })}
    </StyledPopper>
  );
  return (
    <StyledPaper>
      <StyledTabs
        centered
        classes={{ indicator: 'indicator' }}
        displayBottom={displayBottom}
        textColor="primary"
        value={tab}
      >
        <StyledTab
          classes={{ selected: 'selected' }}
          label="Overview"
          onClick={() => handleClick(0, '/settings/overview')}
        />
        <StyledTab
          classes={{ selected: 'selected' }}
          label="Account"
          onClick={() => handleClick(1, '/settings/account')}
        />
        {!isMobileOrTablet && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Issues"
            onClick={() => handleClick(2, '/settings/issues')}
          />
        )}
        {!isMobileOrTabletOrLaptop && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Organizations"
            onClick={() => handleClick(3, '/settings/organizations')}
          />
        )}
        {isDesktopL && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Pull Requests"
            onClick={() => handleClick(4, '/settings/pullrequests')}
          />
        )}
        {!isDesktopL && [
          <StyledTab label="..." onClick={handeOpenMenu} />,
          <ConditionalRender Component={TabMenu} shouldRender={openMenu} />,
        ]}
      </StyledTabs>
      <ConditionalRender
        Component={SecondarySettingsComponent}
        FallbackComponent={ComponentToRender[tab]}
        shouldRender={
          view === 'attempting' ||
          view === 'deposit' ||
          view === 'watching' ||
          view === 'withdrawal'
        }
      />
    </StyledPaper>
  );
};

SettingsTabs.propTypes = {
  activity: T.array,
  attempting: T.array,
  balance: T.number,
  changeEmail: T.bool,
  changeFirstName: T.bool,
  changeLastName: T.bool,
  changeUsername: T.bool,
  creditCardProps: T.object,
  currentTab: T.number,
  deviceView: T.string,
  dispatchOpenModal: T.func,
  displayBottom: T.bool,
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
  setDisplayBottom: T.func,
  setValue: T.func,
  userId: T.string,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
  view: T.string,
  watching: T.array,
};

export default SettingsTabs;
