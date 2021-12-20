import { createSelector } from 'reselect';

import { snakeToCamel } from 'utils/globalHelpers';

import { optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectUserDashboardDomain = state => state.userDashboard || initialState;
const selectUserDashboardProps = (state, props) => props;

const makeSelectUserDashboard = prop =>
  createSelector(
    selectUserDashboardDomain,
    substate => substate[prop],
  );

const makeSelectUserDashboardLoading = prop =>
  createSelector(
    makeSelectUserDashboard('loading'),
    loading => loading[prop],
  );

const makeSelectUserDashboardQuestions = () =>
  createSelector(
    makeSelectUserDashboard('form'),
    makeSelectUserDashboard('questions'),
    ({ application }, questions) => {
      const formattedQuestions = questions.map(
        ({ questionKey, questionText, required, responses, subtext }) => {
          const hasPlaceholder = !!optionDictionary[questionKey].placeholder;
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          const tableData = application[snakeToCamel(questionKey)];
          return {
            description: subtext,
            id: snakeToCamel(questionKey),
            options: responses.map(({ value }) => ({ value })),
            optionType: option,
            placeholder:
              hasPlaceholder && !application[snakeToCamel(questionKey)].length
                ? placeholder
                : '',
            question: questionText,
            required,
            tableData,
            type,
          };
        },
      );
      return formattedQuestions;
    },
  );

const makeSelectUserDashboardView = () =>
  createSelector(
    selectUserDashboardProps,
    props => props.match.params.view || 'main',
  );

export default selectUserDashboardDomain;
export {
  makeSelectUserDashboard,
  makeSelectUserDashboardLoading,
  makeSelectUserDashboardQuestions,
  makeSelectUserDashboardView,
};
