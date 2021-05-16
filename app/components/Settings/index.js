import React, { useEffect, useState } from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import DepositFormComponent from './Balance/Deposit/DepositFormComponent';
import UserAccount from './Account';
import UserAttempting from './Attempting';
import UserBounties from './Bounties';
import UserIssues from './Issues';
import UserPullRequests from './PullRequests';
import UserRepos from './Repos';
import UserTimelineView from './Timeline';
import UserWatching from './Watching';
import WithdrawalFormComponent from './Balance/Withdrawal/WithdrawalFormComponent';
import {
  SettingsContainer,
  SettingsTabsWrapper,
  SettingsViewContainer,
  StyledErrorSuccessBanner,
  StyledPaper,
  StyledTab,
  StyledTabs,
} from './styledComponents';

const SettingsView = ({
  alerts: { error, success },
  creditCardProps,
  currentTab,
  data: {
    activePullRequests,
    activity,
    attempting,
    balance,
    bounties,
    completedPullRequests,
    createdDate,
    dollarsEarned,
    email,
    firstName,
    githubLink,
    githubUsername,
    isGithubVerified,
    issues,
    lastName,
    personalLink,
    preferredLanguages,
    profilePic,
    receiveWeeklyEmails,
    rejectedPullRequests,
    rep,
    repos,
    stackoverflowLink,
    username,
    watching,
  },
  dispatchAcceptBounty,
  dispatchOpenModal,
  dispatchPaypalPayment,
  dispatchSaveChange,
  filterValues,
  handleChangeEmail,
  handleClearAlerts,
  handleClearErrors,
  handleInputChange,
  handleNav,
  handleRemoveAttempting,
  handleRemoveWatching,
  handleValidateInput,
  handleWithdrawFunds,
  inputErrors,
  PullRequestComponent,
  view,
}) => {
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeGithub, setChangeGithub] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changePersonal, setChangePersonal] = useState(false);
  const [changePreferredLanguages, setChangePreferredLanguages] = useState(
    false,
  );
  const [changeReceiveWeeklyEmails, setChangeReceiveWeeklyEmails] = useState(
    false,
  );
  const [changeStackoverflow, setChangeStackoverflow] = useState(false);
  const [changeUserImage, setChangeUserImage] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  const [displayBottom, setDisplayBottom] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [stripeError, setStripeError] = useState('');
  const [tab, setTab] = useState(currentTab);
  const [tabToDisplay, setTabToDisplay] = useState(currentTab);
  const [value, setValue] = useState('');

  useEffect(() => {
    setTab(currentTab);
    setTabToDisplay(currentTab);
  }, [currentTab]);

  const handleClick = (newTab, route) => {
    setTab(newTab);
    setTabToDisplay(newTab);
    handleNav(route);
  };

  const handleClearAllAlerts = () => {
    handleClearAlerts();
    setStripeError('');
  };

  const handleClose = ({ changeInputState }) => {
    changeInputState(false);
    handleClearErrors();
    setIsDisabled(false);
    setValue('');
  };

  const handleEdit = ({ changeInputState, currentValue = '' }) => {
    setIsDisabled(true);
    changeInputState(true);
    setValue(currentValue);
  };

  const handleSubmitEmailChange = () => {
    const hasNoErrors = Object.keys(inputErrors).every(
      input => inputErrors[input] === '',
    );
    if (hasNoErrors) {
      handleChangeEmail({ email: value });
      setChangeEmail(false);
      setIsDisabled(false);
    } else {
      handleValidateInput({ field: 'email', values: { email: value } });
    }
  };

  const handleSubmitInputChange = ({ changeInputState, field, inputValue }) => {
    const hasNoErrors = Object.keys(inputErrors).every(
      input => inputErrors[input] === '',
    );
    const formattedValue =
      field === 'githubLink' || field === 'stackoverflowLink'
        ? handleFormatUrl(value)
        : value;
    if (hasNoErrors) {
      changeInputState(false);
      dispatchSaveChange({
        field,
        value: formattedValue || inputValue,
      });
      setIsDisabled(false);
    } else {
      handleValidateInput({ field, values: { [field]: value || inputValue } });
    }
  };

  const handleFormatUrl = val => {
    const { origin, pathname } = new URL(val);
    return `${origin}${pathname}`;
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
        activePullRequests={activePullRequests}
        activity={activity}
        attempting={attempting}
        changeGithub={changeGithub}
        changePersonal={changePersonal}
        changePreferredLanguages={changePreferredLanguages}
        changeStackoverflow={changeStackoverflow}
        changeUserImage={changeUserImage}
        completedPullRequests={completedPullRequests}
        createdDate={createdDate}
        displayBottom={displayBottom}
        dollarsEarned={dollarsEarned}
        filterValues={filterValues}
        firstName={firstName}
        githubLink={githubLink}
        githubUsername={githubUsername}
        handleClose={handleClose}
        handleEdit={handleEdit}
        handleInputChange={handleInputChange}
        handleNav={handleNav}
        handleRemoveAttempting={handleRemoveAttempting}
        handleRemoveWatching={handleRemoveWatching}
        handleSubmitInputChange={handleSubmitInputChange}
        handleValidateInput={handleValidateInput}
        inputErrors={inputErrors}
        isDisabled={isDisabled}
        isGithubVerified={isGithubVerified}
        lastName={lastName}
        personalLink={personalLink}
        preferredLanguages={preferredLanguages}
        profilePic={profilePic}
        rejectedPullRequests={rejectedPullRequests}
        rep={rep}
        setChangeGithub={setChangeGithub}
        setChangePersonal={setChangePersonal}
        setChangePreferredLanguages={setChangePreferredLanguages}
        setChangeStackoverflow={setChangeStackoverflow}
        setChangeUserImage={setChangeUserImage}
        setIsDisabled={setIsDisabled}
        setValue={setValue}
        stackoverflowLink={stackoverflowLink}
        value={value}
        watching={watching}
      />
    ),
    1: (
      <UserAccount
        balance={balance}
        changeEmail={changeEmail}
        changeFirstName={changeFirstName}
        changeLastName={changeLastName}
        changeReceiveWeeklyEmails={changeReceiveWeeklyEmails}
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
        receiveWeeklyEmails={receiveWeeklyEmails}
        setChangeEmail={setChangeEmail}
        setChangeFirstName={setChangeFirstName}
        setChangeLastName={setChangeLastName}
        setChangeReceiveWeeklyEmails={setChangeReceiveWeeklyEmails}
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
        dispatchOpenModal={dispatchOpenModal}
        handleNav={handleNav}
      />
    ),
    3: <UserIssues handleNav={handleNav} issues={issues} />,
    4: <UserRepos handleNav={handleNav} repos={repos} />,
    5: <UserPullRequests Component={PullRequestComponent} />,
  };

  return (
    <SettingsContainer>
      <StyledErrorSuccessBanner
        error={stripeError || error}
        onClose={handleClearAllAlerts}
        success={success}
      />
      <SettingsTabsWrapper displayBottom={displayBottom}>
        <StyledPaper>
          <StyledTabs
            classes={{ indicator: 'indicator', scrollButtons: 'scrollButtons' }}
            displayBottom={displayBottom}
            scrollButtons="on"
            textColor="primary"
            value={tabToDisplay}
            variant="scrollable"
          >
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Overview"
              onClick={() => handleClick(0, '/settings/overview')}
            />
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Account"
              onClick={() => handleClick(1, '/settings/account')}
            />
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Bounties"
              onClick={() => handleClick(2, '/settings/bounties')}
            />
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Issues"
              onClick={() => handleClick(3, '/settings/issues')}
            />
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Repos"
              onClick={() => handleClick(4, '/settings/repos')}
            />
            <StyledTab
              classes={{ selected: 'selected' }}
              disableRipple
              label="Pull Requests"
              onClick={() => handleClick(5, '/settings/pullrequests')}
            />
          </StyledTabs>
          <SettingsViewContainer>
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
          </SettingsViewContainer>
        </StyledPaper>
      </SettingsTabsWrapper>
    </SettingsContainer>
  );
};

SettingsView.propTypes = {
  alerts: T.object.isRequired,
  creditCardProps: T.object.isRequired,
  currentTab: T.number.isRequired,
  data: T.object.isRequired,
  dispatchAcceptBounty: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchPaypalPayment: T.func.isRequired,
  dispatchSaveChange: T.func.isRequired,
  filterValues: T.object.isRequired,
  handleChangeEmail: T.func.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClearErrors: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveAttempting: T.func.isRequired,
  handleRemoveWatching: T.func.isRequired,
  handleValidateInput: T.func.isRequired,
  handleWithdrawFunds: T.func.isRequired,
  inputErrors: T.object.isRequired,
  PullRequestComponent: T.oneOfType([T.func, T.node, T.object]),
  view: T.string,
};

export default SettingsView;
