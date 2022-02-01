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

const LanguageChart = ({ languages }) => {
  const graph = languages.map(({ commits, language }) => {
    const width = (commits / 2500) * 100;
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
  languages: T.array,
};

export default LanguageChart;
