/* eslint-disable array-callback-return, consistent-return */
import isEmtpy from 'lodash/isEmpty';

export const filterOrganizations = (organizations, filterParams) =>
  organizations.filter(({ name, preferredLanguages, totalFunded }) => {
    const {
      language: languageFilter,
      organization: organizationFilter,
      price: priceFilter,
    } = filterParams;
    const formattedLanguageFilter = languageFilter.map(({ value }) =>
      value.toLowerCase(),
    );
    const formattedOrganizationFilter = organizationFilter.map(({ value }) =>
      value.toLowerCase(),
    );
    if (
      !isEmtpy(formattedLanguageFilter) &&
      !preferredLanguages.some(language =>
        formattedLanguageFilter.includes(language.toLowerCase()),
      )
    ) {
      return false;
    }
    if (
      !isEmtpy(formattedOrganizationFilter) &&
      !formattedOrganizationFilter.includes(name.toLowerCase())
    ) {
      return false;
    }
    if (totalFunded < priceFilter[0] || totalFunded > priceFilter[1]) {
      return false;
    }
    return true;
  });

export const organizeOrganizations = (organizations, organizeParam) => {
  const sortedArray = organizations.sort((a, b) => {
    if (organizeParam === 'Newest') {
      if (a.modifiedDate < b.modifiedDate) {
        return 1;
      }
      return -1;
    }
    if (organizeParam === 'Most Funded') {
      if (a.totalFunded < b.totalFunded) {
        return 1;
      }
      return -1;
    }
  });
  return sortedArray;
};

export const searchOrganizations = (organizations, { value }) => {
  const filteredArray = organizations.filter(({ description, name }) => {
    if (name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    if (description.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filteredArray;
};
