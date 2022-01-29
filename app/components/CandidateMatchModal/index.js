import React from 'react';
import T from 'prop-types';

import { generateColor } from 'utils/globalHelpers';

import {
  BaseBar,
  MatchBar,
  ModalContainer,
  ModalHeader,
  StyledCircle,
  StyledTitle,
} from './styledComponents';

const CandidateMatchModal = ({ matchCriteria, percentMatch }) => (
  <ModalContainer>
    <ModalHeader>
      <StyledTitle>Candidate match</StyledTitle>
      <StyledCircle percentage={percentMatch} />
    </ModalHeader>
    {Object.keys(matchCriteria).map(criteria => {
      const generatePercent = () => {
        if (matchCriteria[criteria] === false) return 0;
        if (matchCriteria[criteria] === true) return 1;
        return matchCriteria[criteria];
      };
      const percentage = generatePercent();
      return (
        <BaseBar key={`${criteria}-bar`}>
          <MatchBar
            color={generateColor(percentage * 100)}
            percentage={percentage}
          >
            {criteria}
          </MatchBar>
        </BaseBar>
      );
    })}
  </ModalContainer>
);

CandidateMatchModal.propTypes = {
  matchCriteria: T.object.isRequired,
  percentMatch: T.number.isRequired,
};

export default CandidateMatchModal;
