/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import CandidateCard from './CandidateCard';
import { CompanyDashboardContainer } from './styledComponents';

const CompanyDashboard = ({
  candidates,
  dispatchOpenModal,
  dispatchSaveCandidate,
  selectedPosition,
}) => (
  <CompanyDashboardContainer>
    {selectedPosition}
    {candidates.map((candidate, index) => (
      <CandidateCard
        key={index}
        dispatchOpenModal={dispatchOpenModal}
        dispatchSaveCandidate={dispatchSaveCandidate}
        index={index}
        {...candidate}
      />
    ))}
  </CompanyDashboardContainer>
);

CompanyDashboard.propTypes = {
  candidates: T.array.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  selectedPosition: T.string.isRequired,
};

export default CompanyDashboard;
