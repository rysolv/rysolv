import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import UserAccount from './Account';
import UserAttempting from './Attempting';
import DepositFormComponent from './Balance/Deposit/DepositFormComponent';
import WithdrawalFormComponent from './Balance/Withdrawal/WithdrawalFormComponent';
import { getTabToDisplay } from './helpers';
import UserBounties from './Bounties';
import UserIssues from './Issues';
import UserPullRequests from './PullRequests';
import UserRepos from './Repos';
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
  bounties,
  changeEmail,
  changeFirstName,
  changeLastName,
  changeUsername,
  creditCardProps,
  currentTab,
  deviceView,
  dispatchAcceptBounty,
  dispatchOpenModal,
  dispatchPaypalPayment,
  displayBottom,
  dollarsEarned,
  email,
  filterValues,
  firstName,
  githubUsername,
  handleClearAllAlerts,
  handleClearErrors,
  handleClose,
  handleEdit,
  handleInputChange,
  handleNav,
  handleRemoveAttempting,
  handleRemoveWatching,
  handleSubmitEmailChange,
  handleSubmitInputChange,
  handleValidateInput,
  handleWithdrawFunds,
  inputErrors,
  isDisabled,
  isGithubVerified,
  issues,
  lastName,
  PullRequestComponent,
  repos,
  setChangeEmail,
  setChangeFirstName,
  setChangeLastName,
  setChangeUsername,
  setDisplayBottom,
  setStripeError,
  setValue,
  username,
  value,
  view,
  watching,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [tab, setTab] = useState(currentTab);
  const [tabsInMenu, setTabsInMenu] = useState([]);
  const [tabToDisplay, setTabToDisplay] = useState(currentTab);

  useEffect(() => {
    setTab(currentTab);
    setTabToDisplay(getTabToDisplay(currentTab, tabsInMenu));
  }, [currentTab]);

  useEffect(() => {
    if (
      deviceView === 'tablet' ||
      deviceView === 'mobile' ||
      deviceView === 'mobileS' ||
      deviceView === 'mobileXS' ||
      deviceView === 'mobileXXS'
    ) {
      setTabsInMenu(['Issues', 'Repos', 'Pull Requests']);
    }
    if (
      deviceView === 'laptopS' ||
      deviceView === 'laptop' ||
      deviceView === 'desktopS'
    ) {
      setTabsInMenu(['Repos', 'Pull Requests']);
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
    isMobileOrTablet || deviceView === 'laptopS' || deviceView === 'laptop';
  const isLaptopOrDesktop =
    isMobileOrTabletOrLaptop ||
    deviceView === 'laptopL' ||
    deviceView === 'desktopS';
  const isDesktopL = deviceView === 'desktopL';
  const openMenu = Boolean(anchorEl);

  const handleClick = (newTab, route) => {
    setTab(newTab);
    setTabToDisplay(getTabToDisplay(newTab, tabsInMenu));
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
          dispatchPaypalPayment={dispatchPaypalPayment}
          handleClearAllAlerts={handleClearAllAlerts}
          handleClearErrors={handleClearErrors}
          handleValidateInput={handleValidateInput}
          inputErrors={inputErrors}
          setDisplayBottom={setDisplayBottom}
          setStripeError={setStripeError}
        />
      }
      FallbackComponent={
        <WithdrawalFormComponent
          balance={balance}
          email={email}
          handleClearAllAlerts={handleClearAllAlerts}
          handleClearErrors={handleClearErrors}
          handleValidateInput={handleValidateInput}
          handleWithdrawFunds={handleWithdrawFunds}
          inputErrors={inputErrors}
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
          handleRemoveAttempting={handleRemoveAttempting}
        />
      }
      FallbackComponent={
        <UserWatching
          handleNav={handleNav}
          handleRemoveWatching={handleRemoveWatching}
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
        githubUsername={githubUsername}
        handleInputChange={handleInputChange}
        handleNav={handleNav}
        handleRemoveAttempting={handleRemoveAttempting}
        handleRemoveWatching={handleRemoveWatching}
        isGithubVerified={isGithubVerified}
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
        handleEdit={handleEdit}
        handleNav={handleNav}
        handleSubmitEmailChange={handleSubmitEmailChange}
        handleSubmitInputChange={handleSubmitInputChange}
        handleValidateInput={handleValidateInput}
        inputErrors={inputErrors}
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
    2: (
      <UserBounties
        bounties={bounties}
        dispatchAcceptBounty={dispatchAcceptBounty}
        handleNav={handleNav}
      />
    ),
    3: <UserIssues handleNav={handleNav} issues={issues} />,
    4: <UserRepos handleNav={handleNav} repos={repos} />,
    5: <UserPullRequests Component={PullRequestComponent} />,
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
        value={tabsInMenu.length > 0 ? tabToDisplay : false}
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
            label="Bounties"
            onClick={() => handleClick(2, '/settings/bounties')}
          />
        )}
        {!isMobileOrTabletOrLaptop && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Issues"
            onClick={() => handleClick(3, '/settings/issues')}
          />
        )}
        {!isLaptopOrDesktop && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Repos"
            onClick={() => handleClick(4, '/settings/repos')}
          />
        )}
        {isDesktopL && (
          <StyledTab
            classes={{ selected: 'selected' }}
            label="Pull Requests"
            onClick={() => handleClick(5, '/settings/pullrequests')}
          />
        )}
        {!isDesktopL && [
          <StyledTab
            key="more"
            classes={{ selected: 'selected' }}
            label="..."
            onClick={handeOpenMenu}
          />,
          <ConditionalRender
            key="tabMenu"
            Component={TabMenu}
            shouldRender={openMenu}
          />,
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
  bounties: T.array,
  changeEmail: T.bool,
  changeFirstName: T.bool,
  changeLastName: T.bool,
  changeUsername: T.bool,
  creditCardProps: T.object,
  currentTab: T.number,
  deviceView: T.string,
  dispatchAcceptBounty: T.func.isRequired,
  dispatchOpenModal: T.func,
  dispatchPaypalPayment: T.func,
  displayBottom: T.bool,
  dollarsEarned: T.number,
  email: T.string,
  filterValues: T.object,
  firstName: T.string,
  githubUsername: T.string,
  handleClearAllAlerts: T.func,
  handleClearErrors: T.func,
  handleClose: T.func,
  handleEdit: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  handleRemoveAttempting: T.func,
  handleRemoveWatching: T.func,
  handleSubmitEmailChange: T.func,
  handleSubmitInputChange: T.func,
  handleValidateInput: T.func,
  handleWithdrawFunds: T.func,
  inputErrors: T.object,
  isDisabled: T.bool,
  isGithubVerified: T.bool,
  issues: T.array,
  lastName: T.string,
  PullRequestComponent: T.oneOfType([T.func, T.node, T.object]),
  repos: T.array,
  setChangeEmail: T.func,
  setChangeFirstName: T.func,
  setChangeLastName: T.func,
  setChangeUsername: T.func,
  setDisplayBottom: T.func,
  setStripeError: T.func,
  setValue: T.func,
  username: T.string,
  value: T.oneOfType([T.array, T.number, T.string]),
  view: T.string,
  watching: T.array,
};

export default SettingsTabs;
