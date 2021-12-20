import { createSelector } from 'reselect';

import { formatActivity } from 'utils/formatActivity';
import { initialState } from './reducer';

const selectSettingsDomain = state => state.settings || initialState;

const makeSelectSettings = prop =>
  createSelector(
    selectSettingsDomain,
    substate => substate[prop],
  );

const makeSelectSettingsDetail = () =>
  createSelector(
    makeSelectSettings('account'),
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

const makeSelectSettingsSkillsQuestion = () =>
  createSelector(
    makeSelectSettings('questions'),
    questions => {
      // eslint-disable-next-line array-callback-return, consistent-return
      const formattedQuestions = questions.reduce(
        (acc, { questionKey, responses }) => {
          if (questionKey === 'skills') {
            acc.options = responses.map(({ value }) => ({ value }));
          }
          return acc;
        },
        {},
      );
      return formattedQuestions;
    },
  );

export default selectSettingsDomain;
export {
  makeSelectSettings,
  makeSelectSettingsDetail,
  makeSelectSettingsSkillsQuestion,
};
