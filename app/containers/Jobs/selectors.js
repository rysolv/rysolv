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

const makeSelectJobResponseArray = () =>
  createSelector(
    makeSelectJobs('form'),
    makeSelectJobs('questions'),
    (form, questions) => {
      if (questions.length) {
        const requestBody = Object.keys(form).map(input => {
          const { value: values } = form[input];
          const [{ id: questionId, responses }] = questions.filter(
            ({ questionKey }) => input === snakeToCamel(questionKey),
          );
          if (Array.isArray(values)) {
            const array = values.map(value => {
              const [{ id: responseId }] = responses.filter(
                response => response.value === value,
              );
              return {
                question_id: questionId,
                response_id: responseId,
              };
            });
            return array;
          }
          const [{ id: responseId }] = responses.filter(
            response => response.value === values,
          );
          return {
            question_id: questionId,
            response_id: responseId,
          };
        });
        return requestBody;
      }
      return [];
    },
  );

export default selectJobsDomain;
export { makeSelectJobQuestions, makeSelectJobResponseArray, makeSelectJobs };
