import React, { useState } from 'react';
import T from 'prop-types';

import {
  BaseFileInput,
  Coin,
  ConditionalRender,
  IconButton,
} from 'components/base_ui';
import { getBase64 } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  EmptyGithubLinkComponent,
  GithubEditComponent,
  GithubLinkComponent,
} from './GithubLinkComponents';
import {
  EmptyPersonalLinkComponent,
  PersonalEditComponent,
  PersonalLinkComponent,
} from './PersonalLinkComponents';
import {
  EmptyStackoverflowLinkComponent,
  StackoverflowEditComponent,
  StackoverflowLinkComponent,
} from './StackoverflowLinkComponents';
import UserMetricsView from './Metrics';
import SettingsTabs from './SettingsTabs';
import {
  DetailContainer,
  DetailViewContainer,
  EditUserImageWrapper,
  InputIconGroup,
  LinksWrapper,
  Name,
  Rep,
  SettingsTabsWrapper,
  StyledErrorSuccessBanner,
  UserCardWrapper,
  UserImage,
} from './styledComponents';

const CloseIcon = iconDictionary('close');
const DoneIcon = iconDictionary('done');

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
    rejectedPullRequests,
    rep,
    repos,
    stackoverflowLink,
    username,
    watching,
  },
  deviceView,
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
  const [displayBottom, setDisplayBottom] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changeFirstName, setChangeFirstName] = useState(false);
  const [changeGithub, setChangeGithub] = useState(false);
  const [changeLastName, setChangeLastName] = useState(false);
  const [changePersonal, setChangePersonal] = useState(false);
  const [changePreferredLanguages, setChangePreferredLanguages] = useState(
    false,
  );
  const [changeStackoverflow, setChangeStackoverflow] = useState(false);
  const [changeUserImage, setChangeUserImage] = useState(false);
  const [changeUsername, setChangeUsername] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [stripeError, setStripeError] = useState('');
  const [value, setValue] = useState('');

  const {
    githubLink: githubLinkError,
    personalLink: personalLinkError,
    stackoverflowLink: stackoverflowLinkError,
  } = inputErrors;

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

  const handleSubmitInputChange = ({ changeInputState, field }) => {
    const hasNoErrors = Object.keys(inputErrors).every(
      input => inputErrors[input] === '',
    );
    const formattedValue =
      field === 'githubLink' || field === 'stackoverflowLink'
        ? handleFormatUrl(value)
        : value;
    if (hasNoErrors) {
      changeInputState(false);
      dispatchSaveChange({ field, value: formattedValue });
      setIsDisabled(false);
    } else {
      handleValidateInput({ field, values: { [field]: value } });
    }
  };

  const handleUploadUserImage = async e => {
    const { files } = e.target;
    const formattedUserImage = await getBase64(files[0]);
    setIsDisabled(true);
    setChangeUserImage(true);
    setValue(formattedUserImage);
  };

  const handleFormatUrl = val => {
    const { origin, pathname } = new URL(val);
    return `${origin}${pathname}`;
  };

  const profilePicToRender = !changeUserImage ? profilePic : value;
  return (
    <DetailContainer>
      <StyledErrorSuccessBanner
        error={stripeError || error}
        onClose={handleClearAllAlerts}
        success={success}
      />
      <DetailViewContainer>
        <UserCardWrapper displayBottom={displayBottom}>
          <EditUserImageWrapper>
            <UserImage src={profilePicToRender} />
            <ConditionalRender
              Component={
                <BaseFileInput
                  accept="image/png, image/jpeg"
                  id="logoFileInput"
                  onChange={handleUploadUserImage}
                />
              }
              FallbackComponent={
                <InputIconGroup>
                  <IconButton
                    icon={CloseIcon}
                    label="Close"
                    onClick={() =>
                      handleClose({ changeInputState: setChangeUserImage })
                    }
                  />
                  <IconButton
                    icon={DoneIcon}
                    label="Save"
                    onClick={() =>
                      handleSubmitInputChange({
                        changeInputState: setChangeUserImage,
                        field: 'profilePic',
                      })
                    }
                  />
                </InputIconGroup>
              }
              shouldRender={!changeUserImage}
            />
          </EditUserImageWrapper>
          <Name>
            {firstName} {lastName}
          </Name>
          <LinksWrapper>
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={GithubLinkComponent}
                  FallbackComponent={EmptyGithubLinkComponent}
                  propsToPassDown={{
                    githubLink,
                    handleEdit,
                    isDisabled,
                    setChangeGithub,
                  }}
                  shouldRender={!!githubLink}
                />
              }
              FallbackComponent={
                <GithubEditComponent
                  githubLinkError={githubLinkError}
                  handleClose={handleClose}
                  handleSubmitInputChange={handleSubmitInputChange}
                  handleValidateInput={handleValidateInput}
                  setChangeGithub={setChangeGithub}
                  setValue={setValue}
                  value={value}
                />
              }
              shouldRender={!changeGithub}
            />
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={PersonalLinkComponent}
                  FallbackComponent={EmptyPersonalLinkComponent}
                  propsToPassDown={{
                    handleEdit,
                    isDisabled,
                    personalLink,
                    setChangePersonal,
                  }}
                  shouldRender={!!personalLink}
                />
              }
              FallbackComponent={
                <PersonalEditComponent
                  handleClose={handleClose}
                  handleSubmitInputChange={handleSubmitInputChange}
                  handleValidateInput={handleValidateInput}
                  personalLinkError={personalLinkError}
                  setChangePersonal={setChangePersonal}
                  setValue={setValue}
                  value={value}
                />
              }
              shouldRender={!changePersonal}
            />
            <ConditionalRender
              Component={
                <ConditionalRender
                  Component={StackoverflowLinkComponent}
                  FallbackComponent={EmptyStackoverflowLinkComponent}
                  propsToPassDown={{
                    stackoverflowLink,
                    handleEdit,
                    isDisabled,
                    setChangeStackoverflow,
                  }}
                  shouldRender={!!stackoverflowLink}
                />
              }
              FallbackComponent={
                <StackoverflowEditComponent
                  handleClose={handleClose}
                  handleSubmitInputChange={handleSubmitInputChange}
                  handleValidateInput={handleValidateInput}
                  setChangeStackoverflow={setChangeStackoverflow}
                  setValue={setValue}
                  stackoverflowLinkError={stackoverflowLinkError}
                  value={value}
                />
              }
              shouldRender={!changeStackoverflow}
            />
          </LinksWrapper>
          <Rep>
            <Coin />
            &nbsp;<b> {rep}</b>&nbsp;credits
          </Rep>
          <UserMetricsView
            activePullRequests={activePullRequests}
            changePreferredLanguages={changePreferredLanguages}
            completedPullRequests={completedPullRequests}
            createdDate={createdDate}
            dollarsEarned={dollarsEarned}
            handleClose={handleClose}
            handleEdit={handleEdit}
            handleSubmitInputChange={handleSubmitInputChange}
            isDisabled={isDisabled}
            preferredLanguages={preferredLanguages}
            rejectedPullRequests={rejectedPullRequests}
            setChangePreferredLanguages={setChangePreferredLanguages}
            setValue={setValue}
            value={value}
          />
        </UserCardWrapper>
        <SettingsTabsWrapper displayBottom={displayBottom}>
          <SettingsTabs
            activity={activity}
            attempting={attempting}
            balance={balance}
            bounties={bounties}
            changeEmail={changeEmail}
            changeFirstName={changeFirstName}
            changeLastName={changeLastName}
            changeUsername={changeUsername}
            creditCardProps={creditCardProps}
            currentTab={currentTab}
            deviceView={deviceView}
            dispatchAcceptBounty={dispatchAcceptBounty}
            dispatchOpenModal={dispatchOpenModal}
            dispatchPaypalPayment={dispatchPaypalPayment}
            displayBottom={displayBottom}
            dollarsEarned={dollarsEarned}
            email={email}
            filterValues={filterValues}
            firstName={firstName}
            githubUsername={githubUsername}
            handleClearAllAlerts={handleClearAllAlerts}
            handleClearErrors={handleClearErrors}
            handleClose={handleClose}
            handleEdit={handleEdit}
            handleInputChange={handleInputChange}
            handleNav={handleNav}
            handleRemoveAttempting={handleRemoveAttempting}
            handleRemoveWatching={handleRemoveWatching}
            handleSubmitEmailChange={handleSubmitEmailChange}
            handleSubmitInputChange={handleSubmitInputChange}
            handleValidateInput={handleValidateInput}
            handleWithdrawFunds={handleWithdrawFunds}
            inputErrors={inputErrors}
            isDisabled={isDisabled}
            isGithubVerified={isGithubVerified}
            issues={issues}
            lastName={lastName}
            PullRequestComponent={PullRequestComponent}
            repos={repos}
            setChangeEmail={setChangeEmail}
            setChangeFirstName={setChangeFirstName}
            setChangeLastName={setChangeLastName}
            setChangeUsername={setChangeUsername}
            setDisplayBottom={setDisplayBottom}
            setStripeError={setStripeError}
            setValue={setValue}
            username={username}
            value={value}
            view={view}
            watching={watching}
          />
        </SettingsTabsWrapper>
      </DetailViewContainer>
    </DetailContainer>
  );
};

SettingsView.propTypes = {
  alerts: T.object.isRequired,
  creditCardProps: T.object.isRequired,
  currentTab: T.number.isRequired,
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
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
