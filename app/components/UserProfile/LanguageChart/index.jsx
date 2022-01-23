/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import {
  LanguageContainer,
  LanguageBar,
  Commits,
  LanguageRow,
} from './styledComponents';

const SkillsWrapper = ({ skills }) => {
  const skillComponents = skills.map(({ name, commits }) => {
    return (
      <LanguageRow key={name}>
        <LanguageBar>JavaScript</LanguageBar>
        <Commits>1,203</Commits>
      </LanguageRow>
    );
  });

  return <LanguageContainer>{skillComponents}</LanguageContainer>;
};

SkillsWrapper.propTypes = {
  skills: T.array,
};

export default SkillsWrapper;
