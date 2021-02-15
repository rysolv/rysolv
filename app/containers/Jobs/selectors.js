import { createSelector } from 'reselect';

import { snakeToCamel } from 'utils/globalHelpers';

import { optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectJobsDomain = state => state.jobs || initialState;

const makeSelectJobs = prop =>
  createSelector(
    selectJobsDomain,
    substate => substate[prop],
  );

const makeSelectJobQuestions = () =>
  createSelector(
    makeSelectJobs('questions'),
    questions => {
      const formattedQuestions = questions.map(
        ({ questionKey, questionText, responses, subtext }) => ({
          description: subtext,
          id: snakeToCamel(questionKey),
          options: responses.map(({ value }) => ({ value, label: value })),
          optionType: optionDictionary[questionKey],
          question: questionText,
        }),
      );
      return formattedQuestions;
    },
  );

export default selectJobsDomain;
export { makeSelectJobQuestions, makeSelectJobs };
