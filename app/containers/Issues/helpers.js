/* eslint-disable prettier/prettier */
import { intersection, isEmpty } from 'lodash';

export const filterIssues = (issues, filterParams) => {
  const {
    language: languageFilter,
    organization: organizationFilter,
    price: priceFilter,
    status: { closed, funded, unfunded },
    type: { bug, feature },
  } = filterParams;
  let bugIssues = [];
  let closedIssues = [];
  let featureIssues = [];
  let fundedIssues = [];
  let unfundedIssues = [];

  const filteredIssues = issues.filter(
    ({ fundedAmount, language: languages, organizationName }) => {
      const formattedLanguageFilter = languageFilter.map(item =>
        item.toLowerCase(),
      );
      const formattedOrganizationFilter = organizationFilter.map(item =>
        item.toLowerCase(),
      );
      if (
        !isEmpty(formattedLanguageFilter) &&
        !languages.some(language =>
          formattedLanguageFilter.includes(language.toLowerCase()),
        )
      ) {
        return false;
      }
      if (
        !isEmpty(formattedOrganizationFilter) &&
        !formattedOrganizationFilter.includes(organizationName.toLowerCase())
      ) {
        return false;
      }
      if (fundedAmount < priceFilter[0] || fundedAmount > priceFilter[1]) {
        return false;
      }
      return true;
    },
  );
  if (closed) {
    closedIssues = filteredIssues.filter(
      ({ open: isOpen }) => isOpen === false,
    );
  }
  if (funded) {
    fundedIssues = filteredIssues.filter(
      ({ fundedAmount, open: isOpen }) => isOpen === true && fundedAmount,
    );
  }
  if (unfunded) {
    unfundedIssues = filteredIssues.filter(
      ({ fundedAmount, open: isOpen }) => isOpen === true && fundedAmount === 0,
    );
  }
  if (bug) {
    bugIssues = filteredIssues.filter(({ type }) => type === 'bug')
  }
  if (feature) {
    featureIssues = filteredIssues.filter(({ type }) => type === 'feature')
  }
  const arr1 =
     closed || funded || unfunded
       ? closedIssues.concat(fundedIssues.concat(unfundedIssues))
       : filteredIssues;
  const arr2 = bug || feature ? bugIssues.concat(featureIssues) : filteredIssues;
  return intersection(arr1, arr2)
};
