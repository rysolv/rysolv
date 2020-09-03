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
        const filteredActivity = activity.filter(
          el =>
            el.actionType !== 'add_watching' &&
            el.actionType !== 'remove_watching',
        );
        const formattedActivity = filteredActivity.map(el =>
          formatActivity(el),
        );
        tempUser.activity = formattedActivity;
      }
      return tempUser;
    },
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

export default selectUsersDomain;
export {
  makeSelectUserDetail,
  makeSelectUsers,
  makeSelectUsersError,
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
};
