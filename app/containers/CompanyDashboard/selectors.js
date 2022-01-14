/* eslint-disable no-param-reassign */
import { createSelector } from 'reselect';

import { snakeToCamel } from 'utils/globalHelpers';

import { filterCandidates, optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectCompanyDashboardDomain = state =>
  state.companyDashboard || initialState;

const selectCompanyDashboardProps = (state, props) => props;

const makeSelectCompanyDashboardCandidates = () =>
  createSelector(
    makeSelectCompanyDashboard('candidates'),
    makeSelectCompanyDashboard('filter'),
    (candidates, filter) => {
      const filteredCandidates = filterCandidates(candidates, filter);
      return filteredCandidates.map(
        ({ firstName, lastName, languages, ...restProps }) => ({
          preferredLanguages: languages.slice(0, 3),
          name: `${firstName} ${lastName}`,
          ...restProps,
        }),
      );
    },
  );

const makeSelectCompanyDashboardLoading = prop =>
  createSelector(
    makeSelectCompanyDashboard('loading'),
    loading => loading[prop],
  );

const makeSelectCompanyDashboardPosition = prop =>
  createSelector(
    makeSelectCompanyDashboard('positions'),
    makeSelectCompanyDashboard('selectedPosition'),
    (positions, selectedPosition) => {
      if (!!positions.length && selectedPosition) {
        const filteredPosition = positions.filter(
          ({ id }) => id === selectedPosition,
        );
        const positionObject = filteredPosition[0] || {};
        return positionObject[prop];
      }
      return null;
    },
  );

const makeSelectCompanyDashboardQuestions = prop =>
  createSelector(
    makeSelectCompanyDashboard('form'),
    makeSelectCompanyDashboard('questions'),
    (form, questions) => {
      const selectedQuestions = questions[prop];
      const formattedQuestions = selectedQuestions.map(
        ({ questionKey, questionText, required, responses, subtext }) => {
          const hasPlaceholder = !!optionDictionary[questionKey].placeholder;
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          const tableData = form[prop][snakeToCamel(questionKey)];
          return {
            description: subtext,
            id: snakeToCamel(questionKey),
            options: responses.map(({ value }) => ({ value })),
            optionType: option,
            placeholder:
              hasPlaceholder && !form[prop][snakeToCamel(questionKey)].length
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
    (form, questions) => {
      const { companyPosition } = form;
      const { companyPosition: companyPositionQuestions } = questions;
      const responseArray = [];
      if (companyPositionQuestions.length) {
        Object.keys(companyPosition).forEach(async input => {
          const values = companyPosition[input];
          const [
            { id: questionId, questionKey, responses },
          ] = companyPositionQuestions.filter(
            ({ questionKey: key }) => input === snakeToCamel(key),
          );
          if (Array.isArray(values)) {
            values.forEach(async value => {
              const filter = responses.filter(
                response =>
                  response.responseKey === 'skill' || response.value === value,
              );
              const [{ id: responseId }] = filter;

              responseArray.push({
                questionId,
                questionKey,
                responseId,
                value,
              });
            });
          }
          if (!Array.isArray(values) && values) {
            const filter = responses.filter(
              response =>
                response.responseKey === 'location' ||
                response.responseKey === 'position_description' ||
                response.responseKey === 'title' ||
                response.value === values,
            );
            const [{ id: responseId }] = filter;
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
  makeSelectCompanyDashboardLoading,
  makeSelectCompanyDashboardPosition,
  makeSelectCompanyDashboardQuestions,
  makeSelectCompanyDashboardResponseArray,
  makeSelectCompanyDashboardView,
};
