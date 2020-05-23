import React, { useState } from 'react';
import T from 'prop-types';

import { ConditionalRender, Star } from 'components/base_ui';

import {
  GithubEditComponent,
  GithubLinkComponent,
} from './GithubLinkComponents';
import {
  PersonalEditComponent,
  PersonalLinkComponent,
} from './PersonalLinkComponents';
import {
  StackoverflowEditComponent,
  StackoverflowLinkComponent,
} from './StackoverflowLinkComponents';
import UserMetricsView from './Metrics';
import SettingsTabs from './SettingsTabs';
import {
  DetailContainer,
  DetailViewContainer,
  LinksWrapper,
  Name,
  Rep,
  SettingsTabsWrapper,
  StyledErrorSuccessBanner,
  UserCardWrapper,
  UserImage,
} from './styledComponents';

const SettingsView = ({
  alerts: { error, success },
  currentTab,
  data: {
    activePullRequests,
    attempting,
    completedPullRequests,
    createdDate,
    dollarsEarned,
    firstName,
    githubLink,
    id,
    isOnline,
    lastName,
    modifiedDate,
    personalLink,
    preferredLanguages,
    profilePic,
    rejectedPullRequests,
    rep,
    stackoverflowLink,
    watching,
  },
  dispatchSaveChange,
  filterValues,
  handleClearAlerts,
  handleInputChange,
  handleNav,
}) => {
  const [changeGithub, setChangeGithub] = useState(false);
  const [changePersonal, setChangePersonal] = useState(false);
  const [changePreferredLanguages, setChangePreferredLanguages] = useState(
    false,
  );
  const [changeStackoverflow, setChangeStackoverflow] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [value, setValue] = useState('');

  const handleClose = ({ changeInputState }) => {
    changeInputState(false);
    setIsDisabled(false);
    setValue('');
  };

  const handleDone = ({ changeInputState, field }) => {
    changeInputState(false);
    dispatchSaveChange({ field, itemId: id, value });
    setIsDisabled(false);
  };

  const handleEdit = ({ changeInputState, currentValue }) => {
    setIsDisabled(true);
    changeInputState(true);
    setValue(currentValue);
  };
  return (
    <DetailContainer>
      <StyledErrorSuccessBanner
        error={error}
        onClose={handleClearAlerts}
        success={success}
      />
      <DetailViewContainer>
        <UserCardWrapper>
          <UserImage src={profilePic} />
          <Name>
            {firstName} {lastName}
          </Name>
          <LinksWrapper>
            {githubLink && (
              <ConditionalRender
                Component={GithubLinkComponent}
                FallbackComponent={
                  <GithubEditComponent
                    handleClose={handleClose}
                    handleDone={handleDone}
                    setChangeGithub={setChangeGithub}
                    setValue={setValue}
                    value={value}
                  />
                }
                propsToPassDown={{
                  githubLink,
                  handleEdit,
                  isDisabled,
                  setChangeGithub,
                }}
                shouldRender={!changeGithub}
              />
            )}
            {personalLink && (
              <ConditionalRender
                Component={PersonalLinkComponent}
                FallbackComponent={
                  <PersonalEditComponent
                    handleClose={handleClose}
                    handleDone={handleDone}
                    setChangePersonal={setChangePersonal}
                    setValue={setValue}
                    value={value}
                  />
                }
                propsToPassDown={{
                  handleEdit,
                  isDisabled,
                  personalLink,
                  setChangePersonal,
                }}
                shouldRender={!changePersonal}
              />
            )}
            {stackoverflowLink && (
              <ConditionalRender
                Component={StackoverflowLinkComponent}
                FallbackComponent={
                  <StackoverflowEditComponent
                    handleClose={handleClose}
                    handleDone={handleDone}
                    setChangeStackoverflow={setChangeStackoverflow}
                    setValue={setValue}
                    value={value}
                  />
                }
                propsToPassDown={{
                  stackoverflowLink,
                  handleEdit,
                  isDisabled,
                  setChangeStackoverflow,
                }}
                shouldRender={!changeStackoverflow}
              />
            )}
          </LinksWrapper>
          <Rep>
            <Star />
            &nbsp;<b> {rep}</b>&nbsp;credits
          </Rep>
          <UserMetricsView
            activePullRequests={activePullRequests}
            changePreferredLanguages={changePreferredLanguages}
            completedPullRequests={completedPullRequests}
            createdDate={createdDate}
            dollarsEarned={dollarsEarned}
            handleClose={handleClose}
            handleDone={handleDone}
            handleEdit={handleEdit}
            isDisabled={isDisabled}
            isOnline={isOnline}
            modifiedDate={modifiedDate}
            preferredLanguages={preferredLanguages}
            rejectedPullRequests={rejectedPullRequests}
            setChangePreferredLanguages={setChangePreferredLanguages}
            setValue={setValue}
          />
        </UserCardWrapper>
        <SettingsTabsWrapper>
          <SettingsTabs
            attempting={attempting}
            currentTab={currentTab}
            filterValues={filterValues}
            handleInputChange={handleInputChange}
            handleNav={handleNav}
            watching={watching}
          />
        </SettingsTabsWrapper>
      </DetailViewContainer>
    </DetailContainer>
  );
};

SettingsView.propTypes = {
  alerts: T.object.isRequired,
  currentTab: T.number.isRequired,
  data: T.object.isRequired,
  dispatchSaveChange: T.func.isRequired,
  filterValues: T.object.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default SettingsView;
