import { createSelector } from 'reselect';

import { convertFileToDataUrl, snakeToCamel } from 'utils/globalHelpers';

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
          const tableData = form[snakeToCamel(questionKey)];
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          return {
            description: subtext,
            id: snakeToCamel(questionKey),
            limit,
            options: responses.map(({ value }) => ({ value })),
            optionType: option,
            placeholder:
              hasPlaceholder && !form[snakeToCamel(questionKey)].length
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

const makeSelectJobResponseArray = () =>
  createSelector(
    makeSelectJobs('form'),
    makeSelectJobs('questions'),
    (form, questions) => {
      const responseArray = [];
      if (questions.length) {
        Object.keys(form).forEach(async input => {
          const values = form[input];
          const [{ id: questionId, questionKey, responses }] = questions.filter(
            ({ questionKey: key }) => input === snakeToCamel(key),
          );
          if (Array.isArray(values)) {
            values.forEach(async value => {
              const [{ id: responseId, responseKey }] = responses.filter(
                response =>
                  response.responseKey === 'resume' ||
                  response.responseKey === 'skill' ||
                  response.value === value,
              );
              let formattedValue = value;
              if (responseKey === 'resume') {
                const { name } = value;
                const filenameArray = name.split('.');
                const fileExtension = filenameArray[filenameArray.length - 1];
                formattedValue = {
                  file: await convertFileToDataUrl(value),
                  fileExtension,
                };
              }
              responseArray.push({
                questionId,
                questionKey,
                responseId,
                value: formattedValue,
              });
            });
          }
          if (!Array.isArray(values) && values) {
            const [{ id: responseId }] = responses.filter(
              response =>
                response.responseKey === 'preferred_locations' ||
                response.value === values,
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
