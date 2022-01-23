import React from 'react';
import T from 'prop-types';

import { LanguageWrapper } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CommitChart from './CommitChart';
import SkillsWrapper from './SkillsWrapper';

import {
  AboutContainer,
  ContentColumn,
  ContributionCard,
  ContributionContainer,
  DetailCharts,
  IconWrapper,
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
  StyledSubtitle,
  UserProfileContainer,
} from './styledComponents';

const locationIcon = iconDictionary('location');
const GithubIcon = iconDictionary('github');
const PersonalIcon = iconDictionary('link');
const StackoverflowIcon = iconDictionary('stackoverflow');

const UserProfile = ({ activeUser, data }) => {
  const {
    firstName,
    lastName,
    profilePic,
    desiredRole,
    chartData,
    location,
    skills,
  } = data;

  const { commits, languageByCommits, githubStats } = chartData;
  console.log(data);

  return (
    <UserProfileContainer>
      <ProfileColumn>
        <ProfilePic src={profilePic} />
        <StyledName>
          {firstName} {lastName}
        </StyledName>
        <StyledSubtitle>Senior Engineer at Rysolv</StyledSubtitle>

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
          <IconWrapper>{GithubIcon}</IconWrapper>
          <IconWrapper>{PersonalIcon}</IconWrapper>
          <IconWrapper>{StackoverflowIcon}</IconWrapper>
        </SocialLinkWrapper>

        <StyledHeader>Top Skills</StyledHeader>
        <SkillsWrapper skills={skills} />
      </ProfileColumn>

      <ContentColumn>
        {/* User Intro */}
        <ProfileSection>
          <AboutContainer>
            Hey I&apos;m tyler and I do cool dev stuff. Founded rysolv.com, a
            crowdfunding platform for open-source development. Worked for Kumanu
            for a while;
            <br />
            <br />
            Also worked at Kumanu for a while. Backend engineer. JavaScript /
            Python. Some machine learning stuff.
          </AboutContainer>
        </ProfileSection>

        {/* Commit chart */}
        <ProfileSection>
          <CommitChart commits={commits} />
          <DetailCharts>
            <div>
              <p>Commits: 1203</p>
              <p>Pull requests: 308</p>
              <p>Total stars: 102</p>
              <p>Contibuted to: 44</p>
            </div>
            <img src={require('./temp.png')} alt="hi" />
          </DetailCharts>
        </ProfileSection>

        {/* Top repos */}
        <ProfileSection>
          <StyledHeader>Top Repos</StyledHeader>
          <div>
            <ContributionCard>
              Rysolv 85 stars, 33 forks, 10 contributors
            </ContributionCard>
          </div>
        </ProfileSection>

        {/* Contribution List */}
        <ProfileSection>
          <StyledHeader>Recent Contributions</StyledHeader>
          <ContributionContainer>
            <ContributionCard>
              Closed some_big_issue on my-blog
            </ContributionCard>
            <ContributionCard>completed 100 days of code</ContributionCard>
          </ContributionContainer>
        </ProfileSection>
      </ContentColumn>
    </UserProfileContainer>
  );
};

UserProfile.propTypes = {
  activeUser: T.object,
  data: T.object.isRequired,
};

export default UserProfile;
