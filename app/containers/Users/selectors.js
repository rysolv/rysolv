import { createSelector } from 'reselect';
import moment from 'moment';

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

const makeSelectUsersFormatted = () =>
  createSelector(
    makeSelectUsers('users'),
    users =>
      users.map(
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
          id,
          image: profilePic,
          issuesNumber,
          joinDate: moment(createdDate).format('M/D/YYYY'),
          name: `${firstName} ${lastName}`,
          pointsNumber: rep,
        }),
      ),
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
  makeSelectUsersFormatted,
  makeSelectUsersLoading,
  makeSelectUsersSearchDisabled,
  makeSelectUsersStep,
};
