import React from 'react';
import T from 'prop-types';

import { IconButton, Star } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';
import { formatUrlLinks } from 'utils/globalHelpers';

import UserMetricsView from './Metrics';
import SettingsTabs from './SettingsTabs';
import {
  DetailContainer,
  DetailViewContainer,
  LinkIcon,
  LinksWrapper,
  Name,
  OneLink,
  OneLinkWrapper,
  Rep,
  SettingsTabsWrapper,
  StyledA,
  UserCardWrapper,
  UserImage,
} from './styledComponents';

const EditIcon = iconDictionary('edit');
const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

export class SettingsView extends React.PureComponent {
  render() {
    const {
      currentTab,
      data: {
        activePullRequests,
        completedPullRequests,
        createdDate,
        dollarsEarned,
        firstName,
        githubLink,
        isOnline,
        lastName,
        modifiedDate,
        personalLink,
        preferredLanguages,
        profilePic,
        rejectedPullRequests,
        rep,
        stackoverflowLink,
      },
      filterValues,
      handleInputChange,
      handleNav,
    } = this.props;
    return (
      <DetailContainer>
        <DetailViewContainer>
          <UserCardWrapper>
            <UserImage src={profilePic} />
            <Name>
              {firstName} {lastName}
            </Name>
            <LinksWrapper>
              {githubLink && (
                <OneLinkWrapper>
                  <OneLink>
                    <LinkIcon>{GithubIcon}</LinkIcon>
                    <StyledA href={githubLink} target="_blank">
                      {formatUrlLinks({ githubLink })}
                    </StyledA>
                  </OneLink>
                  <IconButton icon={EditIcon} label="Edit" onClick={() => {}} />
                </OneLinkWrapper>
              )}
              {personalLink && (
                <OneLinkWrapper>
                  <OneLink>
                    <LinkIcon>{PersonalIcon}</LinkIcon>
                    <StyledA href={personalLink} target="_blank">
                      {formatUrlLinks({ personalLink })}
                    </StyledA>
                  </OneLink>
                  <IconButton icon={EditIcon} label="Edit" onClick={() => {}} />
                </OneLinkWrapper>
              )}
              {stackoverflowLink && (
                <OneLinkWrapper>
                  <OneLink>
                    <LinkIcon>{StackoverflowIcon}</LinkIcon>
                    <StyledA href={stackoverflowLink} target="_blank">
                      {formatUrlLinks({ stackoverflowLink })}
                    </StyledA>
                  </OneLink>
                  <IconButton icon={EditIcon} label="Edit" onClick={() => {}} />
                </OneLinkWrapper>
              )}
            </LinksWrapper>
            <Rep>
              <Star />
              &nbsp;<b> {rep}</b>&nbsp;credits
            </Rep>
            <UserMetricsView
              activePullRequests={activePullRequests}
              completedPullRequests={completedPullRequests}
              createdDate={createdDate}
              dollarsEarned={dollarsEarned}
              isOnline={isOnline}
              modifiedDate={modifiedDate}
              preferredLanguages={preferredLanguages}
              rejectedPullRequests={rejectedPullRequests}
            />
          </UserCardWrapper>
          <SettingsTabsWrapper>
            <SettingsTabs
              currentTab={currentTab}
              filterValues={filterValues}
              handleInputChange={handleInputChange}
              handleNav={handleNav}
            />
          </SettingsTabsWrapper>
        </DetailViewContainer>
      </DetailContainer>
    );
  }
}

SettingsView.propTypes = {
  currentTab: T.number.isRequired,
  data: T.object.isRequired,
  filterValues: T.object.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
};

export default SettingsView;
