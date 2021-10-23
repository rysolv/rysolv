import { createSelector } from 'reselect';

import { snakeToCamel } from 'utils/globalHelpers';

import { optionDictionary } from './helpers';
import { initialState } from './reducer';

const selectCompanySignUpDomain = state => state.companySignUp || initialState;

const makeSelectCompanyResponseArray = () =>
  createSelector(
    makeSelectCompanySignUp('form'),
    makeSelectCompanySignUp('questions'),
    (form, questions) => {
      const responseArray = [];
      if (questions.length) {
        Object.keys(form).forEach(async input => {
          const { value: values } = form[input];
          const [{ id: questionId, questionKey, responses }] = questions.filter(
            ({ questionKey: key }) => input === snakeToCamel(key),
          );
          if (!Array.isArray(values) && values) {
            const [{ id: responseId }] = responses.filter(
              response =>
                response.responseKey === 'description' ||
                response.responseKey === 'location' ||
                response.responseKey === 'name' ||
                response.responseKey === 'website' ||
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

const makeSelectCompanySignUp = prop =>
  createSelector(
    selectCompanySignUpDomain,
    substate => substate[prop],
  );

const makeSelectCompanySignUpQuestions = () =>
  createSelector(
    makeSelectCompanySignUp('form'),
    makeSelectCompanySignUp('questions'),
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

export default selectCompanySignUpDomain;
export {
  makeSelectCompanyResponseArray,
  makeSelectCompanySignUp,
  makeSelectCompanySignUpQuestions,
};
