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
const Github = iconDictionary('github');
const Issues = iconDictionary('issue');
const PullRequest = iconDictionary('pullRequest');
const ReactIcon = iconDictionary('reactIcon');

const ExampleProfile = () => (
  <ContributionContainer>
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
  </ContributionContainer>
);

export default ExampleProfile;
