/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectOverviewDomain = state => state.overview || initialState;

const makeSelectOverview = prop =>
  createSelector(
    selectOverviewDomain,
    substate => substate[prop],
  );

const makeSelectOrganizationOptions = () =>
  createSelector(
    makeSelectOverview('organizationOptions'),
    organizationOptions => {
      if (organizationOptions) {
        return organizationOptions.map(({ name }) => ({
          value: name,
        }));
      }
      return [];
    },
  );

export default makeSelectOverview;
export { makeSelectOrganizationOptions, selectOverviewDomain };
