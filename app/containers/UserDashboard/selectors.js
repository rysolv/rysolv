import { createSelector } from 'reselect';

import { convertFileToDataUrl, snakeToCamel } from 'utils/globalHelpers';

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

const makeSelectUserDashboardResponseArray = () =>
  createSelector(
    makeSelectUserDashboard('form'),
    makeSelectUserDashboard('questions'),
    (form, questions) => {
      const { application } = form;
      const responseArray = [];
      if (questions.length) {
        Object.keys(application).forEach(async input => {
          const values = application[input];
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
  makeSelectUserDashboardResponseArray,
  makeSelectUserDashboardView,
};
