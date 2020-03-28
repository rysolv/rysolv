import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUsersDomain = state => state.users || initialState;

const makeSelectUsers = prop =>
  createSelector(
    selectUsersDomain,
    substate => substate[prop],
  );

const makeSelectUsersDisabled = () =>
  createSelector(
    makeSelectUsers('data'),
    data => {
      const tempData = { ...data };
      delete tempData.importUrl;
      return Object.keys(tempData).every(item => tempData[item].value !== '');
    },
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

const makeSelectUsersStep = prop =>
  createSelector(
    makeSelectUsers('step'),
    step => step[prop],
  );

export default selectUsersDomain;
export {
  makeSelectUsers,
  makeSelectUsersDisabled,
  makeSelectUsersError,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
  makeSelectUsersStep,
};
