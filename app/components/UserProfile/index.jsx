import React, { Fragment } from 'react';
import T from 'prop-types';

import { ConditionalRender, LanguageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CommitChart from './CommitChart';
import LanguageChart from './LanguageChart';
import PullRequestCard from './PullRequestCard';
import RepoCard from './RepoCard';
import SkillsWrapper from './SkillsWrapper';
import SummaryChart from './SummaryChart';

import {
  AboutContainer,
  ContentColumn,
  DetailCharts,
  FallBackCard,
  IconLink,
  LocationIconWrapper,
  LocationName,
  LocationWrapper,
  ProfileColumn,
  ProfilePic,
  ProfileSection,
  RoleContainer,
  SocialLinkWrapper,
  StyledHeader,
  StyledName,
  StyledPrimaryButton,
  StyledSubtitle,
  UserProfileContainer,
} from './styledComponents';

const GithubIcon = iconDictionary('github');
const locationIcon = iconDictionary('location');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

const UserProfile = ({ data, handleNav }) => {
  const {
    about,
    chartData,
    desiredRole,
    firstName,
    githubLink,
    hiringStatus,
    isSignedIn,
    lastName,
    location,
    personalLink,
    profilePic,
    skills,
    stackoverflowLink,
    title,
  } = data;

  const {
    commits,
    githubStats,
    languageByCommits,
    pullRequestStats,
    repoStats,
  } = chartData;

  const surveyFallback = isSignedIn ? (
    <StyledPrimaryButton
      label="Complete Survey"
      onClick={() => handleNav('/dashboard/update')}
    />
  ) : (
    <Fragment />
  );

  return (
    <UserProfileContainer>
      <ProfileColumn>
        <ProfilePic src={profilePic} />
        <StyledName>
          {firstName} {lastName}
        </StyledName>

        <ConditionalRender
          Component={
            <Fragment>
              <StyledSubtitle>{title}</StyledSubtitle>

              <LocationWrapper>
                <LocationIconWrapper>{locationIcon}</LocationIconWrapper>
                <LocationName>{location}</LocationName>
              </LocationWrapper>

              <RoleContainer>
                {desiredRole.map(role => (
                  <LanguageWrapper key={role} language={role} />
                ))}
              </RoleContainer>

              <SocialLinkWrapper>
                {githubLink && (
                  <IconLink href={githubLink} target="_blank">
                    {GithubIcon}
                  </IconLink>
                )}
                {personalLink && (
                  <IconLink href={personalLink} target="_blank">
                    {PersonalIcon}
                  </IconLink>
                )}
                {stackoverflowLink && (
                  <IconLink href={stackoverflowLink} target="_blank">
                    {StackoverflowIcon}
                  </IconLink>
                )}
              </SocialLinkWrapper>

              <StyledHeader>Top Skills</StyledHeader>
              <SkillsWrapper skills={skills} />
            </Fragment>
          }
          FallbackComponent={surveyFallback}
          shouldRender={hiringStatus && hiringStatus !== 'undeclared'}
        />
      </ProfileColumn>

      <ContentColumn>
        {/* User Intro */}
        <ProfileSection>
          <ConditionalRender
            Component={<AboutContainer>{about}</AboutContainer>}
            shouldRender={!!about}
          />
        </ProfileSection>

        {/* Commit chart */}
        <ProfileSection>
          <CommitChart commits={commits} />
        </ProfileSection>

        <ProfileSection>
          <DetailCharts>
            <SummaryChart githubStats={githubStats} />
            <LanguageChart languages={languageByCommits} />
          </DetailCharts>
        </ProfileSection>

        {/* Top repos */}
        <ProfileSection>
          <StyledHeader>Top Repos</StyledHeader>
          <ConditionalRender
            Component={<RepoCard repoStats={repoStats} />}
            FallbackComponent={<FallBackCard>No repos found.</FallBackCard>}
            shouldRender={!!repoStats.length}
          />
        </ProfileSection>

        {/* Contribution List */}
        <ProfileSection>
          <StyledHeader>Recent Contributions</StyledHeader>
          <ConditionalRender
            Component={<PullRequestCard pullRequestStats={pullRequestStats} />}
            FallbackComponent={
              <FallBackCard>No pull requests found.</FallBackCard>
            }
            shouldRender={!!pullRequestStats.length}
          />
        </ProfileSection>
      </ContentColumn>
    </UserProfileContainer>
  );
};

UserProfile.propTypes = {
  data: T.object.isRequired,
  handleNav: T.func.isRequired,
};

export default UserProfile;
