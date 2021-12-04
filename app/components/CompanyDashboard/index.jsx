/* eslint-disable react/no-array-index-key */
import React from 'react';
import T from 'prop-types';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';

import ExistingDashboard from './ExistingDashboard';
import InitialDashboard from './InitialDashboard';

const CompanyDashboard = ({
  candidates,
  dispatchChangeFilter,
  dispatchOpenModal,
  dispatchSaveCandidate,
  filter,
  handleNav,
  loading,
  matchCandidatesLoading,
  positions,
  positionTitle,
  selectedPosition,
}) => (
  <ConditionalRender
    Component={
      <AsyncRender
        asyncData={candidates}
        component={ExistingDashboard}
        error={false}
        isRequiredData={false}
        loading={loading}
        propsToPassDown={{
          dispatchChangeFilter,
          dispatchOpenModal,
          dispatchSaveCandidate,
          filter,
          handleNav,
          matchCandidatesLoading,
          positionTitle,
          selectedPosition,
        }}
      />
    }
    FallbackComponent={InitialDashboard}
    shouldRender={!!positions.length}
  />
);

CompanyDashboard.propTypes = {
  candidates: T.array.isRequired,
  dispatchChangeFilter: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSaveCandidate: T.func.isRequired,
  filter: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
  matchCandidatesLoading: T.bool.isRequired,
  positions: T.array.isRequired,
  positionTitle: T.string,
  selectedPosition: T.string.isRequired,
};

export default CompanyDashboard;
