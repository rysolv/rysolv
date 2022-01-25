/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';

import {
  IconWrapper,
  SummaryContainer,
  SummaryRow,
  TitleRow,
} from './styledComponents';

const pullRequestIcon = iconDictionary('pullRequest');
const repoIcon = iconDictionary('repo');

const SummaryChart = ({ githubStats }) => {
  const {
    stars,
    commits,
    contributedTo,
    pullRequests,
    avgCommit,
  } = githubStats;
  return (
    <SummaryContainer>
      <TitleRow>
        <div>Summary</div>
      </TitleRow>

      <SummaryRow>Commits</SummaryRow>
      <SummaryRow>Total Stars</SummaryRow>
      <SummaryRow>
        <IconWrapper>{repoIcon}</IconWrapper>Contributed To
      </SummaryRow>
      <SummaryRow>
        <IconWrapper>{pullRequestIcon}</IconWrapper>Pull Requests
      </SummaryRow>
      <SummaryRow>Average Commit</SummaryRow>
    </SummaryContainer>
  );
};

SummaryChart.propTypes = {
  githubStats: T.object,
};

export default SummaryChart;
