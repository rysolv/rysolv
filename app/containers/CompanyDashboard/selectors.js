/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import { snakeToCamel } from 'utils/globalHelpers';

import { filterCandidates, optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectCompanyDashboardDomain = state =>
  state.companyDashboard || initialState;

const selectCompanyDashboardProps = (state, props) => props;

const makeSelectCompanyDashboardCandidates = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    makeSelectCompanyDashboard('filter'),
    makeSelectCompanyDashboard('selectedPosition'),
    (companyMatches, filter, selectedPosition) => {
      if (!isEmpty(companyMatches) && !!selectedPosition) {
        const { candidates } = companyMatches.find(
          ({ position: { id } }) => id === selectedPosition,
        );
        const filteredCandidates = filterCandidates(candidates, filter);
        return filteredCandidates.map(
          ({ firstName, lastName, languages, ...restProps }) => ({
            languages: languages.slice(0, 3),
            name: `${firstName.charAt(0)}. ${lastName.charAt(0)}.`,
            ...restProps,
          }),
        );
      }
      return [];
    },
  );

const makeSelectCompanyDashboardPositions = () =>
  createSelector(
    makeSelectCompanyDashboard('companyMatches'),
    companyMatches => companyMatches.map(({ position }) => position),
  );

const makeSelectCompanyDashboardQuestions = () =>
  createSelector(
    makeSelectCompanyDashboard('form'),
    makeSelectCompanyDashboard('questions'),
    (form, questions) => {
      const formattedQuestions = questions.map(
        ({ questionKey, questionText, required, responses, subtext }) => {
          const hasPlaceholder = !!optionDictionary[questionKey].placeholder;
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          const tableData = form.createPosition[snakeToCamel(questionKey)];
          return {
            description: subtext,
            id: snakeToCamel(questionKey),
            options: responses.map(({ value }) => ({ value })),
            optionType: option,
            placeholder:
              hasPlaceholder &&
              !form.createPosition[snakeToCamel(questionKey)].value.length
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

const makeSelectCompanyDashboardResponseArray = () =>
  createSelector(
    makeSelectCompanyDashboard('form'),
    makeSelectCompanyDashboard('questions'),
    ({ createPosition }, questions) => {
      const responseArray = [];
      if (questions.length) {
        Object.keys(createPosition).forEach(async input => {
          const values = createPosition[input];
          const [{ id: questionId, questionKey, responses }] = questions.filter(
            ({ questionKey: key }) => input === snakeToCamel(key),
          );
          if (Array.isArray(values)) {
            values.forEach(async value => {
              const [{ id: responseId }] = responses.filter(
                response =>
                  response.responseKey !== 'skills' || response.value === value,
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
              response =>
                response.responseKey !== 'description' ||
                response.responseKey !== 'location' ||
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

const makeSelectCompanyDashboardView = () =>
  createSelector(
    selectCompanyDashboardProps,
    props => props.match.params.view || 'main',
  );

const makeSelectCompanyDashboard = prop =>
  createSelector(
    selectCompanyDashboardDomain,
    substate => substate[prop],
  );

export default selectCompanyDashboardDomain;
export {
  makeSelectCompanyDashboard,
  makeSelectCompanyDashboardCandidates,
  makeSelectCompanyDashboardPositions,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
  makeSelectCompanyDashboardView,
};
