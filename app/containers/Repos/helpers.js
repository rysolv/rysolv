/* eslint-disable array-callback-return, consistent-return */
import isEmtpy from 'lodash/isEmpty';

export const filterRepos = (repos, filterParams) =>
  repos.filter(({ name, preferredLanguages, totalFunded }) => {
    const {
      language: languageFilter,
      price: priceFilter,
      repo: repoFilter,
    } = filterParams;
    const formattedLanguageFilter = languageFilter.map(({ value }) =>
      value.toLowerCase(),
    );
    const formattedRepoFilter = repoFilter.map(({ value }) =>
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
      !isEmtpy(formattedRepoFilter) &&
      !formattedRepoFilter.includes(name.toLowerCase())
    ) {
      return false;
    }
    if (totalFunded < priceFilter[0] || totalFunded > priceFilter[1]) {
      return false;
    }
    return true;
  });

export const organizeRepos = (repos, organizeParam) => {
  const sortedArray = repos.sort((a, b) => {
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

export const searchRepos = (repos, { value }) => {
  const filteredArray = repos.filter(({ description, name }) => {
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
