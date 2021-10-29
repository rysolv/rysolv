import { createSelector } from 'reselect';

import { snakeToCamel } from 'utils/globalHelpers';

import { optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectCompanySignUpDomain = state => state.companySignUp || initialState;

const makeSelectCompanySignUp = prop =>
  createSelector(
    selectCompanySignUpDomain,
    substate => substate[prop],
  );

const makeSelectCompanySignUpQuestions = () =>
  createSelector(
    makeSelectCompanySignUp('forms'),
    makeSelectCompanySignUp('questions'),
    ({ companyInfo }, questions) => {
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
              hasPlaceholder && !companyInfo[snakeToCamel(questionKey)].length
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

export default selectCompanySignUpDomain;
export { makeSelectCompanySignUp, makeSelectCompanySignUpQuestions };
