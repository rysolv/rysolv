import React from 'react';
import iconDictionary from 'utils/iconDictionary';

import {
  BottomFade,
  Contribution,
  ContributionContainer,
  GithubLink,
  Info,
  InfoContainer,
  InfoIcon,
  ProjectContainer,
  ProjectLogo,
  ProjectName,
} from './styledComponents';

const Commit = iconDictionary('addBox');
const FreeCodeCamp = iconDictionary('freeCodeCamp');
const Github = iconDictionary('github');
const Graphql = iconDictionary('graphql');
const Issues = iconDictionary('issue');
const PullRequest = iconDictionary('pullRequest');
const ReactIcon = iconDictionary('reactIcon');

const ExampleProfile = () => (
  <ContributionContainer>
    <Contribution>
      <ProjectContainer>
        <ProjectName color="#e535ab">
          <ProjectLogo>{Graphql}</ProjectLogo>
          GraphQL JS
        </ProjectName>
        <GithubLink>
          <InfoIcon>{Github}</InfoIcon> github.com/graphql/graphql-js
        </GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>
          <InfoIcon>{Issues}</InfoIcon>6 Issues Resolved
        </Info>
        <Info>
          <InfoIcon>{PullRequest}</InfoIcon>8 Pull Requests
        </Info>
        <Info>
          <InfoIcon>{Commit}</InfoIcon>102 commits
        </Info>
      </InfoContainer>
    </Contribution>

    <Contribution>
      <ProjectContainer>
        <ProjectName color="#61dafb">
          <ProjectLogo>{ReactIcon}</ProjectLogo>
          react-table
        </ProjectName>
        <GithubLink>
          <InfoIcon>{Github}</InfoIcon> github.com/tannerlinsley/react-table
        </GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>
          <InfoIcon>{Issues}</InfoIcon>3 Issues Resolved
        </Info>
        <Info>
          <InfoIcon>{PullRequest}</InfoIcon>4 Pull Requests
        </Info>
        <Info>
          <InfoIcon>{Commit}</InfoIcon>44 commits
        </Info>
      </InfoContainer>
    </Contribution>
    <Contribution>
      <ProjectContainer>
        <ProjectName color="#00471b">
          <ProjectLogo>{FreeCodeCamp}</ProjectLogo>
          FreeCodeCamp
        </ProjectName>
        <GithubLink>
          <InfoIcon>{Github}</InfoIcon> github.com/freeCodeCamp/freeCodeCamp
        </GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>
          <InfoIcon>{Issues}</InfoIcon>2 Issues Resolved
        </Info>
        <Info>
          <InfoIcon>{PullRequest}</InfoIcon>2 Pull Requests
        </Info>
        <Info>
          <InfoIcon>{Commit}</InfoIcon>23 commits
        </Info>
      </InfoContainer>
    </Contribution>
    <BottomFade />
  </ContributionContainer>
);

export default ExampleProfile;
