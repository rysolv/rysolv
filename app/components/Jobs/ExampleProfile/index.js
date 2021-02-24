import React from 'react';
import iconDictionary from 'utils/iconDictionary';

import {
  IconContainer,
  InfoContainer,
  LanguageContainer,
  LanguageIcon,
  LanguageStats,
  LanguageWrapper,
  Name,
  ProfileContainer,
  ProfileImage,
  ProfileImageContainer,
  Stats,
  Title,
  UserContainer,
} from './styledComponents';

const Commits = iconDictionary('addBox');
const Issues = iconDictionary('issue');
const Javascript = iconDictionary('javascript');
const PullRequest = iconDictionary('pullRequest');
const Python = iconDictionary('python');
const Ruby = iconDictionary('ruby');

const ExampleProfile = () => (
  <ProfileContainer>
    <UserContainer>
      <ProfileImageContainer>
        <ProfileImage />
      </ProfileImageContainer>
      <InfoContainer>
        <Name>John Doe</Name>
        <Stats>
          <Title>
            <IconContainer>{PullRequest}</IconContainer>
            Pull Requests
          </Title>
          84
        </Stats>
        <Stats>
          <Title>
            <IconContainer>{Commits}</IconContainer>
            Commits
          </Title>
          2,308
        </Stats>
        <Stats>
          <Title>
            <IconContainer>{Issues}</IconContainer>
            Issues resolved
          </Title>
          22
        </Stats>
      </InfoContainer>
    </UserContainer>
    <LanguageContainer>
      <LanguageStats>
        <LanguageWrapper>
          <LanguageIcon>{Javascript}</LanguageIcon>Javascript
        </LanguageWrapper>
        1,022 commits
      </LanguageStats>
      <LanguageStats>
        <LanguageWrapper>
          <LanguageIcon>{Python}</LanguageIcon>Python
        </LanguageWrapper>
        794 commits
      </LanguageStats>
      <LanguageStats>
        <LanguageWrapper>
          <LanguageIcon>{Ruby}</LanguageIcon>Ruby
        </LanguageWrapper>
        433 commits
      </LanguageStats>
    </LanguageContainer>
  </ProfileContainer>
);

export default ExampleProfile;
