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
        ({ questionKey, questionText, required, responses }) => {
          const hasPlaceholder = !!optionDictionary[questionKey].placeholder;
          const { option, placeholder, type } =
            optionDictionary[questionKey] || {};
          return {
            id: snakeToCamel(questionKey),
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
  makeSelectCompanyDashboardView,
};
