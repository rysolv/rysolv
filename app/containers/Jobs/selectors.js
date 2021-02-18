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
        ({ limit, questionKey, questionText, responses, subtext }) => ({
          description: subtext,
          id: snakeToCamel(questionKey),
          limit,
          options: responses.map(({ value }) => ({ value })),
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
      const responseArray = [];
      if (questions.length) {
        Object.keys(form).forEach(input => {
          const { value: values } = form[input];
          const [{ id: questionId, questionKey, responses }] = questions.filter(
            ({ questionKey: key }) => input === snakeToCamel(key),
          );
          if (Array.isArray(values)) {
            values.forEach(value => {
              const [{ id: responseId }] = responses.filter(
                response => response.value === value,
              );
              responseArray.push({
                questionId,
                questionKey,
                responseId,
                value,
              });
            });
          }
          if (!Array.isArray(values) && values) {
            const [{ id: responseId }] = responses.filter(
              response => response.value === values,
            );
            responseArray.push({
              questionId,
              questionKey,
              responseId,
              value: values,
            });
          }
        });
      }
      return responseArray;
    },
  );

export default selectJobsDomain;
export { makeSelectJobQuestions, makeSelectJobResponseArray, makeSelectJobs };
