/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import CandidateCard from './CandidateCard';
import CompanyDashboardStepper from './CompanyDashboardStepper';
import EmptyCandidateCard from './EmptyCandidateCard';
import {
  CandidateCardGroup,
  CompanyDashboardContainer,
} from './styledComponents';

const CompanyDashboard = ({
  activeStep,
  candidates,
  dispatchOpenModal,
  dispatchSaveCandidate,
}) => (
  <CompanyDashboardContainer>
    <CompanyDashboardStepper
      activeStep={activeStep}
      hasCandidates={!!candidates.length}
    />
    <ConditionalRender
      Component={
        <CandidateCardGroup>
          {candidates.map((candidate, index) => (
            <CandidateCard
              key={index}
              dispatchOpenModal={dispatchOpenModal}
              dispatchSaveCandidate={dispatchSaveCandidate}
              index={index}
              {...candidate}
            />
          ))}
        </CandidateCardGroup>
      }
      FallbackComponent={EmptyCandidateCard}
      shouldRender={!!candidates.length}
    />
  </CompanyDashboardContainer>
);

CompanyDashboard.propTypes = {
  activeStep: T.number.isRequired,
  candidates: T.array.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
};

export default CompanyDashboard;
