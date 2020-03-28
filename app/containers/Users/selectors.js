import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersDomain = state => state.users || initialState;

const makeSelectUsers = prop =>
  createSelector(
    selectUsersDomain,
    substate => substate[prop],
  );

const makeSelectUsersError = prop =>
  createSelector(
    makeSelectUsers('error'),
    error => error[prop],
  );

const makeSelectUsersLoading = prop =>
  createSelector(
    makeSelectUsers('loading'),
    loading => loading[prop],
  );

const makeSelectUsersSearchDisabled = () =>
  createSelector(
    makeSelectUsers('search'),
    ({ name }) => name.value === '',
  );

export default selectUsersDomain;
export {
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
};
