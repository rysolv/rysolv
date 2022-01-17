import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectCompanySettingsDomain = state =>
  state.companySettings || initialState;

const selectCompanySettingsProps = (state, props) => props;

const makeSelectCompanySettings = prop =>
  createSelector(
    selectCompanySettingsDomain,
    substate => substate[prop],
  );

const makeSelectCompanySettingsLoading = prop =>
  createSelector(
    makeSelectCompanySettings('loading'),
    loading => loading[prop],
  );

const makeSelectCompanySettingsView = () =>
  createSelector(
    selectCompanySettingsProps,
    props => props.match.params.view || 'main',
  );

export default selectCompanySettingsDomain;
export {
  makeSelectCompanySettings,
  makeSelectCompanySettingsLoading,
  makeSelectCompanySettingsView,
};
