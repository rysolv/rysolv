/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import CandidateTable from 'components/CandidateTable';
import iconDictionary from 'utils/iconDictionary';

import CandidatesLoading from './CandidatesLoading';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateDashboard from './EmptyCandidateDashboard';
import {
  CompanyDashboardContainer,
  CompanyDashboardHeader,
  CompanyDashboardTitle,
  PublicPositionButton,
  StyledIconButton,
} from './styledComponents';

const EditIcon = iconDictionary('edit');
const PublicIcon = iconDictionary('public');

const ExistingDashboard = ({
  candidateCount,
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  handleNav,
  matchCandidatesLoading,
  positionTitle,
  selectedPosition,
}) => {
  const CandidateCards = (
    <ConditionalRender
      Component={
        <CandidateTable
          deviceView={deviceView}
          dispatchOpenModal={dispatchOpenModal}
          dispatchSaveCandidate={dispatchSaveCandidate}
          handleNav={handleNav}
          selectedPosition={selectedPosition}
          candidates={candidates}
        />
      }
      FallbackComponent={EmptyCandidateDashboard}
      shouldRender={!!candidates.length}
    />
  );
  return (
    <CompanyDashboardContainer>
      <CompanyDashboardHeader>
        <CompanyDashboardTitle>
          {positionTitle}
          <StyledIconButton
            disableRipple
            onClick={() =>
              handleNav(
                `/company/dashboard/edit-position?id=${selectedPosition}`,
              )
            }
          >
            {EditIcon}
          </StyledIconButton>
        </CompanyDashboardTitle>
        <PublicPositionButton
          onClick={() => handleNav(`/jobs/${selectedPosition}`)}
        >
          {PublicIcon} View public position
        </PublicPositionButton>
      </CompanyDashboardHeader>
      <CompanyDashboardTabs
        candidateCount={candidateCount}
        dispatchChangeFilter={dispatchChangeFilter}
        filter={filter}
      />
      <ConditionalRender
        Component={CandidateCards}
        FallbackComponent={CandidatesLoading}
        shouldRender={!matchCandidatesLoading}
      />
    </CompanyDashboardContainer>
  );
};

ExistingDashboard.propTypes = {
  candidateCount: T.object.isRequired,
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
  handleNav: T.func.isRequired,
  matchCandidatesLoading: T.bool.isRequired,
  positionTitle: T.string.isRequired,
  selectedPosition: T.string.isRequired,
};

export default ExistingDashboard;
