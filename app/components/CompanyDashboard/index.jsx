/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import CandidateCard from './CandidateCard';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateCard from './EmptyCandidateCard';
import {
  CandidateCardGroup,
  CompanyDashboardContainer,
} from './styledComponents';

const CompanyDashboard = ({
  candidates,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
}) => (
  <CompanyDashboardContainer>
    <CompanyDashboardTabs
      dispatchChangeFilter={dispatchChangeFilter}
      filter={filter}
    />
    <ConditionalRender
      Component={
        <CandidateCardGroup>
          {candidates.map((candidate, index) => (
            <CandidateCard
              key={`candidate-${index}`}
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
  candidates: T.array.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
};

export default CompanyDashboard;
