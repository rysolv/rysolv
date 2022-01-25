/* eslint-disable no-new */
import React from 'react';
import T from 'prop-types';

import { LanguageWrapper } from 'components/base_ui';

import {
  SkillsContainer,
  SkillCard,
  Battery,
  BatteryWrapper,
  BatteryLabel,
  Cell,
} from './styledComponents';

const labelDictionary = {
  1: 'Beginner',
  2: 'Intermediate',
  3: 'Expert',
};

const SkillsWrapper = ({ skills }) => {
  const skillComponents = skills.map(({ name, level }) => {
    const charge = [];
    const label = labelDictionary[level];

    if (Number(level) === 3) {
      charge.push([
        <Cell key={`${name}-1`} />,
        <Cell key={`${name}-2`} />,
        <Cell key={`${name}-3`} />,
      ]);
    }
    if (Number(level) === 2) {
      charge.push([
        <Cell grey key={`${name}-1`} />,
        <Cell key={`${name}-2`} />,
        <Cell key={`${name}-3`} />,
      ]);
    }
    if (Number(level) === 1) {
      charge.push([
        <Cell grey key={`${name}-1`} />,
        <Cell grey key={`${name}-2`} />,
        <Cell key={`${name}-3`} />,
      ]);
    }

    return (
      <SkillCard key={name}>
        <LanguageWrapper language={name} />
        <BatteryWrapper>
          <Battery>{charge}</Battery>
          <BatteryLabel>{label}</BatteryLabel>
        </BatteryWrapper>
      </SkillCard>
    );
  });

  return <SkillsContainer>{skillComponents}</SkillsContainer>;
};

SkillsWrapper.propTypes = {
  skills: T.array,
};

export default SkillsWrapper;
