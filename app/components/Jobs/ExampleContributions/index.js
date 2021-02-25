import React from 'react';

import iconDictionary from 'utils/iconDictionary';

import {
  Contribution,
  ContributionContainer,
  GithubLink,
  Info,
  InfoContainer,
  ProjectContainer,
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
        <ProjectName color="#e535ab">{Graphql}GraphQL JS</ProjectName>
        <GithubLink>{Github}github.com/graphql/graphql-js</GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>{Commit}102 Commits</Info>
        <Info>{Issues}6 Issues resolved</Info>
        <Info>{PullRequest}8 Pull requests</Info>
      </InfoContainer>
    </Contribution>
    <Contribution>
      <ProjectContainer>
        <ProjectName color="#61dafb">{ReactIcon}react-table</ProjectName>
        <GithubLink>{Github}github.com/tannerlinsley/react-table</GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>{Commit}44 Commits</Info>
        <Info>{Issues}3 Issues resolved</Info>
        <Info>{PullRequest}4 Pull requests</Info>
      </InfoContainer>
    </Contribution>
    <Contribution>
      <ProjectContainer>
        <ProjectName color="#00471b">{FreeCodeCamp}FreeCodeCamp</ProjectName>
        <GithubLink>{Github}github.com/freeCodeCamp/freeCodeCamp</GithubLink>
      </ProjectContainer>
      <InfoContainer>
        <Info>{Commit}23 Commits</Info>
        <Info>{Issues}2 Issues resolved</Info>
        <Info>{PullRequest}2 Pull requests</Info>
      </InfoContainer>
    </Contribution>
  </ContributionContainer>
);

export default ExampleProfile;
