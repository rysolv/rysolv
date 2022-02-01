import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  InfoContainer,
  Language,
  LanguageContainer,
  LanguageStats,
  Name,
  ProfileContainer,
  Stats,
  StyledImage,
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
      <StyledImage src="https://rysolv.s3.us-east-2.amazonaws.com/default-profile-picture.png" />
      <InfoContainer>
        <Name>John Doe</Name>
        <Stats>
          <Title>{PullRequest}Pull requests</Title>
          84
        </Stats>
        <Stats>
          <Title>{Commits}Commits</Title>
          2,308
        </Stats>
        <Stats>
          <Title>{Issues}Issues resolved</Title>
          22
        </Stats>
      </InfoContainer>
    </UserContainer>
    <LanguageContainer>
      <LanguageStats>
        <Language>{Javascript}Javascript</Language>
        1,022 commits
      </LanguageStats>
      <LanguageStats>
        <Language>{Python}Python</Language>
        794 commits
      </LanguageStats>
      <LanguageStats>
        <Language>{Ruby}Ruby</Language>
        433 commits
      </LanguageStats>
    </LanguageContainer>
  </ProfileContainer>
);

export default ExampleProfile;
