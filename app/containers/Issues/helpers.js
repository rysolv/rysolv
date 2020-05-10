import isEmtpy from 'lodash/isEmpty';

export const filterIssues = (issues, filterParams) => {
  const {
    language: languageFilter,
    organization: organizationFilter,
    price: priceFilter,
    status: { closed, funded, unfunded },
  } = filterParams;
  let closedIssues = [];
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
        !isEmtpy(formattedLanguageFilter) &&
        !languages.some(language =>
          formattedLanguageFilter.includes(language.toLowerCase()),
        )
      ) {
        return false;
      }
      if (
        !isEmtpy(formattedOrganizationFilter) &&
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
  const newArr =
    closed || funded || unfunded
      ? closedIssues.concat(fundedIssues.concat(unfundedIssues))
      : filteredIssues;
  const set = new Set(newArr);
  return Array.from(set);
};
