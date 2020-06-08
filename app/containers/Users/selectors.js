import { createSelector } from 'reselect';
import moment from 'moment';

import { formatActivity } from 'utils/formatActivity';
import { filterUsers, organizeUsers, searchUsers } from './helpers';
import { initialState } from './reducer';

const selectUsersDomain = state => state.users || initialState;

const makeSelectUsers = prop =>
  createSelector(
    selectUsersDomain,
    substate => substate[prop],
  );

const makeSelectUserDetail = () =>
  createSelector(
    makeSelectUsers('user'),
    user => {
      const { activity } = user;
      const tempUser = { ...user };
      if (activity) {
        const formattedActivity = activity.map(el => formatActivity(el));
        tempUser.activity = formattedActivity;
      }
      return tempUser;
    },
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
    makeSelectUsers('filter'),
    makeSelectUsers('search'),
    (users, filter, { overviewInput }) => {
      const { overview: overviewFilter } = filter;
      if (users.length > 0) {
        const searchedUsers = searchUsers(users, overviewInput);
        const organizedUsers = organizeUsers(searchedUsers, overviewFilter);
        const filteredUsers = filterUsers(organizedUsers, filter);
        return filteredUsers.map(
          ({
            attempting,
            createdDate,
            firstName,
            id,
            issues,
            lastName,
            profilePic,
            rep,
            username,
          }) => ({
            attempting,
            createdDate: moment(createdDate).format('M/D/YYYY'),
            id,
            issues,
            name: `${firstName} ${lastName}`,
            pointsNumber: rep,
            profilePic,
            username,
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

const makeSelectUsersRequestBody = () =>
  createSelector(
    makeSelectUsers('data'),
    data =>
      Object.keys(data).reduce((acc, field) => {
        acc[field] = data[field].value;
        return acc;
      }, {}),
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
  makeSelectUserDetail,
  makeSelectUsers,
  makeSelectUsersDisabled,
  makeSelectUsersEditRequest,
  makeSelectUsersError,
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
  makeSelectUsersRequestBody,
  makeSelectUsersSearchDisabled,
  makeSelectUsersStep,
};
