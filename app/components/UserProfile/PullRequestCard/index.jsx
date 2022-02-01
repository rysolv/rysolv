/* eslint-disable no-new */
import React, { Fragment } from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  Additions,
  Deletions,
  IconWrapper,
  Label,
  PullRequestContainer,
  RepoIconWrapper,
  Stats,
  Title,
  TitleRow,
} from './styledComponents';

const githubIcon = iconDictionary('github');
const commentIcon = iconDictionary('comments');

const PullRequestCard = ({ pullRequestStats }) => {
  const pullRequests = pullRequestStats.map(
    ({ additions, comments, deletions, githubLink, repoName, title }) => (
      <PullRequestContainer href={githubLink} key={githubLink} target="_blank">
        <TitleRow>
          <RepoIconWrapper>{githubIcon}</RepoIconWrapper> {repoName}
        </TitleRow>
        <Title>{title}</Title>
        <Stats>
          <Label>
            <IconWrapper>{commentIcon}</IconWrapper> {comments}
          </Label>
          <Label>
            <Additions>+{additions}</Additions>&nbsp;/&nbsp;
            <Deletions>-{deletions}</Deletions>
          </Label>
        </Stats>
      </PullRequestContainer>
    ),
  );

  return <Fragment>{pullRequests}</Fragment>;
};

PullRequestCard.propTypes = {
  pullRequestStats: T.array,
};

export default PullRequestCard;
