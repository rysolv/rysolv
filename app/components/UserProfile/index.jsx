import React from 'react';
import T from 'prop-types';

import { BackNav } from 'components/base_ui';
import { formatUrlLinks } from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import {
  BioContainer,
  DetailColumn,
  LinkIcon,
  LinksWrapper,
  OneLinkWrapper,
  ProfileColumn,
  ProfileContainer,
  ProfileDetailItem,
  ProfilePicture,
  ProfileWrapper,
  StatsContainer,
  StatsRow,
  StyledA,
  WorkStatus,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

const UserProfile = ({ data }) => {
  const {
    firstName,
    githubLink,
    lastName,
    personalLink,
    profilePic,
    stackoverflowLink,
    hiringStatus,
  } = data;

  return (
    <ProfileWrapper>
      <BackNav label="Back to Dashboard" path="/dashboard" />
      <ProfileContainer>
        <ProfileColumn>
          <ProfilePicture src={profilePic} />
          {hiringStatus === 'active' && (
            <WorkStatus>LOOKING FOR WORK</WorkStatus>
          )}
          <ProfileDetailItem>
            {firstName} {lastName}
          </ProfileDetailItem>
          <LinksWrapper>
            {githubLink && (
              <OneLinkWrapper>
                <LinkIcon>{GithubIcon}</LinkIcon>
                <StyledA href={githubLink} target="_blank">
                  {formatUrlLinks({ githubLink })}
                </StyledA>
              </OneLinkWrapper>
            )}
            {personalLink && (
              <OneLinkWrapper>
                <LinkIcon>{PersonalIcon}</LinkIcon>
                <StyledA href={personalLink} target="_blank">
                  {formatUrlLinks({ personalLink })}
                </StyledA>
              </OneLinkWrapper>
            )}
            {stackoverflowLink && (
              <OneLinkWrapper>
                <LinkIcon>{StackoverflowIcon}</LinkIcon>
                <StyledA href={stackoverflowLink} target="_blank">
                  {formatUrlLinks({ stackoverflowLink })}
                </StyledA>
              </OneLinkWrapper>
            )}
          </LinksWrapper>
        </ProfileColumn>
        <DetailColumn>
          <BioContainer>Hello Im tyler</BioContainer>

          <StatsRow>
            <StatsContainer />
            <StatsContainer />
            <StatsContainer />
          </StatsRow>
        </DetailColumn>
      </ProfileContainer>
    </ProfileWrapper>
  );
};

UserProfile.propTypes = {
  data: T.object.isRequired,
};

export default UserProfile;
