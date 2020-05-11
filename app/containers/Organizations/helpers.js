import isEmtpy from 'lodash/isEmpty';

export const filterOrganizations = (organizations, filterParams) =>
  organizations.filter(({ name, preferredLanguages, totalFunded }) => {
    const {
      language: languageFilter,
      organization: organizationFilter,
      price: priceFilter,
    } = filterParams;
    const formattedLanguageFilter = languageFilter.map(item =>
      item.toLowerCase(),
    );
    const formattedOrganizationFilter = organizationFilter.map(item =>
      item.toLowerCase(),
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
