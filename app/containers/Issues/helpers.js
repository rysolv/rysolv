/* eslint-disable array-callback-return, consistent-return */
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
      const formattedLanguageFilter = languageFilter.map(({ value }) =>
        value.toLowerCase(),
      );
      const formattedOrganizationFilter = organizationFilter.map(({ value }) =>
        value.toLowerCase(),
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
    bugIssues = filteredIssues.filter(({ type }) => type === 'Bug');
  }
  if (feature) {
    featureIssues = filteredIssues.filter(({ type }) => type === 'Feature');
  }
  const arr1 =
    closed || funded || unfunded
      ? closedIssues.concat(fundedIssues.concat(unfundedIssues))
      : filteredIssues;
  const arr2 =
    bug || feature ? bugIssues.concat(featureIssues) : filteredIssues;
  return intersection(arr1, arr2);
};

export const organizeIssues = (issues, organizeParam) => {
  const sortedArray = issues.sort((a, b) => {
    if (!a.open) return 1;
    if (!b.open) return -1;
    if (organizeParam === 'Newest') {
      if (a.createdDate < b.createdDate) {
        return 1;
      }
      return -1;
    }
    if (organizeParam === 'Most Funded') {
      if (a.fundedAmount < b.fundedAmount) {
        return 1;
      }
      return -1;
    }
    if (organizeParam === 'Most Popular') {
      if (a.rep < b.rep) {
        return 1;
      }
      return -1;
    }
  });
  return sortedArray;
};

export const searchIssues = (issues, { value }) => {
  const filteredArray = issues.filter(({ body, name }) => {
    if (name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    if (body.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filteredArray;
};
