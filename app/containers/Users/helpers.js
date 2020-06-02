/* eslint-disable array-callback-return, consistent-return */
import isEmtpy from 'lodash/isEmpty';

export const filterUsers = (users, filterParams) =>
  users.filter(({ preferredLanguages }) => {
    const { language: languageFilter } = filterParams;
    const formattedLanguageFilter = languageFilter.map(({ value }) =>
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
    return true;
  });

export const organizeUsers = (users, organizeParam) => {
  const sortedArray = users.sort((a, b) => {
    if (organizeParam === 'Newest') {
      if (a.createdDate < b.createdDate) {
        return 1;
      }
      return -1;
    }
    if (organizeParam === 'Most Credit') {
      if (a.rep < b.rep) {
        return 1;
      }
      return -1;
    }
  });
  return sortedArray;
};

export const searchUsers = (users, { value }) => {
  const filteredArray = users.filter(({ firstName, lastName, username }) => {
    if (firstName.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    if (lastName.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    if (username.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filteredArray;
};
