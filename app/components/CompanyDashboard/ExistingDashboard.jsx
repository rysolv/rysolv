/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CandidateCard from './CandidateCard';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateDashboard from './EmptyCandidateDashboard';
import {
  CandidateCardGroup,
  CompanyDashboardContainer,
  CompanyDashboardTitle,
  StyledIconButton,
} from './styledComponents';

const EditIcon = iconDictionary('edit');

const ExistingDashboard = ({
  data,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  handleNav,
  positionTitle,
  selectedPosition,
}) => (
  <CompanyDashboardContainer>
    <CompanyDashboardTitle>
      {positionTitle}
      <StyledIconButton
        onClick={() => handleNav(`/dashboard/edit?id=${selectedPosition}`)}
      >
        {EditIcon}
      </StyledIconButton>
    </CompanyDashboardTitle>
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
  handleNav: T.func.isRequired,
  positionTitle: T.string.isRequired,
  selectedPosition: T.string.isRequired,
};

export default ExistingDashboard;
