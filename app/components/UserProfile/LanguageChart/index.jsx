/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import {
  LanguageBar,
  LanguageContainer,
  LanguageRow,
  Percentage,
  TitleRow,
} from './styledComponents';

const LanguageChart = ({ githubStats, languages }) => {
  const { commits: totalCommits } = githubStats;

  const graph = languages.map(({ commits, language }) => {
    const width = (commits / totalCommits) * 100;
    return (
      <LanguageRow key={language}>
        <LanguageBar width={width}>{language}</LanguageBar>
        <Percentage>{`${parseFloat(width).toFixed(1)}%`}</Percentage>
      </LanguageRow>
    );
  });

  return (
    <LanguageContainer>
      <TitleRow>
        <div>Commits by Language</div>
        <div>%</div>
      </TitleRow>
      {graph}
    </LanguageContainer>
  );
};

LanguageChart.propTypes = {
  githubStats: T.object,
  languages: T.array,
};

export default LanguageChart;
