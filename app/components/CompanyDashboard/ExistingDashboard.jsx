/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';
import iconDictionary from 'utils/iconDictionary';

import CandidateCard from './CandidateCard';
import CandidatesLoading from './CandidatesLoading';
import CompanyDashboardTabs from './CompanyDashboardTabs';
import EmptyCandidateDashboard from './EmptyCandidateDashboard';
import {
  CandidateCardGroup,
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
        <CandidateCardGroup>
          {candidates.map((candidate, index) => (
            <CandidateCard
              dispatchOpenModal={dispatchOpenModal}
              dispatchSaveCandidate={dispatchSaveCandidate}
              handleNav={handleNav}
              isLast={candidates.length - 1 === index}
              key={`candidate-${index}`}
              selectedPosition={selectedPosition}
              {...candidate}
            />
          ))}
        </CandidateCardGroup>
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
