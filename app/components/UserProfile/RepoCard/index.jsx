/* eslint-disable no-new */
import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  Description,
  IconWrapper,
  Label,
  RepoContainer,
  RepoIconWrapper,
  Stats,
  TitleRow,
} from './styledComponents';

const contributoIcon = iconDictionary('people');
const githubIcon = iconDictionary('github');
const pullRequestIcon = iconDictionary('pullRequest');
const starIcon = iconDictionary('star');

const RepoCard = ({ repoStats }) => {
  const repos = repoStats.map(
    ({
      contributors,
      description,
      githubLink,
      pullRequests,
      repoName,
      stars,
    }) => (
      <RepoContainer href={githubLink} key={githubLink} target="_blank">
        <TitleRow>
          <RepoIconWrapper>{githubIcon}</RepoIconWrapper> {repoName}
        </TitleRow>
        <Description>{description}</Description>
        <Stats>
          <Label>
            <IconWrapper>{starIcon}</IconWrapper> {stars}
          </Label>
          <Label>
            <IconWrapper>{pullRequestIcon}</IconWrapper> {pullRequests}
          </Label>
          <Label>
            <IconWrapper>{contributoIcon}</IconWrapper> {contributors}
          </Label>
        </Stats>
      </RepoContainer>
    ),
  );

  return <Fragment>{repos}</Fragment>;
};

RepoCard.propTypes = {
  repoStats: T.array,
};

export default RepoCard;
