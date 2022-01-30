import React from 'react';
import T from 'prop-types';

import { ConditionalRender } from 'components/base_ui';

import ClosedDashboard from './ClosedDashboard';
import ExistingDashboard from './ExistingDashboard';
import InitialDashboard from './InitialDashboard';

const CompanyDashboard = ({
  candidateCount,
  candidates,
  deviceView,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  handleNav,
  matchCandidatesLoading,
  positions,
  positionTitle,
  selectedPosition,
}) => {
  const filteredPosition = positions.filter(
    ({ id }) => id === selectedPosition,
  );
  const { isActive } = filteredPosition[0] || {};
  const DashboardToRender =
    isActive === 'No' ? ClosedDashboard : ExistingDashboard;

  return (
    <ConditionalRender
      Component={DashboardToRender}
      FallbackComponent={InitialDashboard}
      propsToPassDown={{
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
      }}
      shouldRender={!!positions.length}
    />
  );
};

CompanyDashboard.propTypes = {
  candidateCount: T.object.isRequired,
  candidates: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
  handleNav: T.func.isRequired,
  matchCandidatesLoading: T.bool.isRequired,
  positions: T.array.isRequired,
  positionTitle: T.string,
  selectedPosition: T.string.isRequired,
};

export default CompanyDashboard;
