import { createSelector } from 'reselect';
import moment from 'moment';

import { initialState } from './reducer';

const selectUsersDomain = state => state.users || initialState;

const makeSelectUsers = prop =>
  createSelector(
    selectUsersDomain,
    substate => substate[prop],
  );

const makeSelectUsersCreateRequest = () =>
  createSelector(
    makeSelectUsers('data'),
    data =>
      Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {}),
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

const makeSelectUsersEditRequest = () =>
  createSelector(
    makeSelectUsers('editInfo'),
    editInfo =>
      Object.keys(editInfo).reduce((acc, field) => {
        acc[field] = editInfo[field].value;
        return acc;
      }, {}),
  );

const makeSelectUsersError = prop =>
  createSelector(
    makeSelectUsers('error'),
    error => error[prop],
  );

const makeSelectUsersFormatted = () =>
  createSelector(
    makeSelectUsers('users'),
    users => {
      if (users.length > 0) {
        return users.map(
          ({
            activeNumber,
            createdDate,
            firstName,
            id,
            issuesNumber,
            lastName,
            profilePic,
            rep,
          }) => ({
            activeNumber,
            createdDate: moment(createdDate).format('M/D/YYYY'),
            id,
            issuesNumber,
            name: `${firstName} ${lastName}`,
            pointsNumber: rep,
            profilePic,
          }),
        );
      }
      return [];
    },
  );

const makeSelectUsersLoading = prop =>
  createSelector(
    makeSelectUsers('loading'),
    loading => loading[prop],
  );

const makeSelectUsersSearchDisabled = () =>
  createSelector(
    makeSelectUsers('search'),
    ({ searchInput }) => searchInput.value === '',
  );

const makeSelectUsersStep = prop =>
  createSelector(
    makeSelectUsers('step'),
    step => step[prop],
  );

export default selectUsersDomain;
export {
  makeSelectUsers,
  makeSelectUsersCreateRequest,
  makeSelectUsersDisabled,
  makeSelectUsersEditRequest,
  makeSelectUsersError,
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
  makeSelectUsersStep,
};
