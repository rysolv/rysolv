import { createSelector } from 'reselect';
import omit from 'lodash/omit';

import { snakeToCamel } from 'utils/globalHelpers';

import { dataUrlRegex, optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectJobsDomain = state => state.jobs || initialState;

const makeSelectJobs = prop =>
  createSelector(
    selectJobsDomain,
    substate => substate[prop],
  );

const makeSelectJobQuestions = () =>
  createSelector(
    makeSelectJobs('form'),
    makeSelectJobs('questions'),
    (form, questions) => {
      const formattedQuestions = questions.map(
        ({
          limit,
          questionKey,
          questionText,
          required,
          responses,
          subtext,
        }) => {
          const hasPlaceholder = !!optionDictionary[questionKey].placeholder;
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          return {
            description: subtext,
            id: snakeToCamel(questionKey),
            limit,
            options: responses.map(({ value }) => ({ value })),
            optionType: option,
            placeholder:
              hasPlaceholder && !form[snakeToCamel(questionKey)].value.length
                ? placeholder
                : '',
            question: questionText,
            required,
            type,
          };
        },
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
        const tempForm = omit(form, ['resumeFilename']);
        Object.keys(tempForm).forEach(input => {
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
            if (dataUrlRegex.test(values)) {
              const [{ id: responseId }] = responses.filter(
                response => response.responseKey === 'resume',
              );
              responseArray.push({
                questionId,
                questionKey,
                responseId,
                value: values,
              });
            } else {
              const [{ id: responseId }] = responses.filter(
                response =>
                  response.responseKey === 'personal_link' ||
                  response.value === values,
              );
              responseArray.push({
                questionId,
                questionKey,
                responseId,
                value: values,
              });
            }
          }
        });
      }
      return responseArray;
    },
  );

export default selectJobsDomain;
export { makeSelectJobQuestions, makeSelectJobResponseArray, makeSelectJobs };
