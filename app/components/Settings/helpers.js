const tabDictionary = {
  0: 'Overview',
  1: 'Account',
  2: 'Issues',
  3: 'Repos',
  4: 'Pull Requests',
};

export const getTabToDisplay = (tab, tabMenu) => {
  if (tabMenu.includes(tabDictionary[tab])) return 5 - tabMenu.length;
  return tab;
};
