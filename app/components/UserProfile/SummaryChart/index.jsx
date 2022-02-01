/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  LabelWrapper,
  SummaryContainer,
  SummaryRow,
  TitleRow,
  Total,
} from './styledComponents';

const averageCommitIcon = iconDictionary('sigma');
const commitIcon = iconDictionary('addCircleOutline');
const pullRequestIcon = iconDictionary('pullRequest');
const repoIcon = iconDictionary('repo');
const starIcon = iconDictionary('star');

const SummaryChart = ({ githubStats }) => {
  const {
    averageCommit,
    commits,
    contributedTo,
    pullRequests,
    stars,
  } = githubStats;
  return (
    <SummaryContainer>
      <TitleRow>
        <div>Summary</div>
      </TitleRow>
      <SummaryRow>
        <LabelWrapper>
          <IconWrapper>{commitIcon}</IconWrapper>Commits
        </LabelWrapper>
        <Total>{commits}</Total>
      </SummaryRow>
      <SummaryRow>
        <LabelWrapper>
          <IconWrapper>{starIcon}</IconWrapper>Total Stars
        </LabelWrapper>
        <Total>{stars}</Total>
      </SummaryRow>
      <SummaryRow>
        <LabelWrapper>
          <IconWrapper>{repoIcon}</IconWrapper>Contributed To
        </LabelWrapper>
        <Total>{contributedTo}</Total>
      </SummaryRow>
      <SummaryRow>
        <LabelWrapper>
          <IconWrapper>{pullRequestIcon}</IconWrapper>Pull Requests
        </LabelWrapper>
        <Total>{pullRequests}</Total>
      </SummaryRow>
      <SummaryRow>
        <LabelWrapper>
          <IconWrapper>{averageCommitIcon}</IconWrapper>
          Lines per Commit
        </LabelWrapper>
        <Total>{averageCommit}</Total>
      </SummaryRow>
    </SummaryContainer>
  );
};

SummaryChart.propTypes = {
  githubStats: T.object,
};

export default SummaryChart;
