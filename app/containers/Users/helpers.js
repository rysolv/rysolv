import isEmtpy from 'lodash/isEmpty';

export const filterUsers = (users, filterParams) =>
  users.filter(({ preferredLanguages }) => {
    const { language: languageFilter } = filterParams;
    const formattedLanguageFilter = languageFilter.map(item =>
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
    return true;
  });
