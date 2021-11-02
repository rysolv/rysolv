/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import CandidateCard from './CandidateCard';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateDashboard from './EmptyCandidateDashboard';
import {
  CandidateCardGroup,
  CompanyDashboardContainer,
} from './styledComponents';

const ExistingDashboard = ({
  data,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  selectedPosition,
}) => (
  <CompanyDashboardContainer>
    <CompanyDashboardTabs
      dispatchChangeFilter={dispatchChangeFilter}
      filter={filter}
    />
    <ConditionalRender
      Component={
        <CandidateCardGroup>
          {data.map((candidate, index) => (
            <CandidateCard
              key={`candidate-${index}`}
              dispatchOpenModal={dispatchOpenModal}
              dispatchSaveCandidate={dispatchSaveCandidate}
              index={index}
              isLast={data.length - 1 === index}
              selectedPosition={selectedPosition}
              {...candidate}
            />
          ))}
        </CandidateCardGroup>
      }
      FallbackComponent={EmptyCandidateDashboard}
      shouldRender={!!data.length}
    />
  </CompanyDashboardContainer>
);

ExistingDashboard.propTypes = {
  data: T.array.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
  selectedPosition: T.string.isRequired,
};

export default ExistingDashboard;
