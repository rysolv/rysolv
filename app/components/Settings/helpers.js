const tabDictionary = {
  0: 'Overview',
  1: 'Account',
  2: 'Bounties',
  3: 'Issues',
  4: 'Repos',
  5: 'Pull Requests',
};

export const getTabToDisplay = (tab, tabMenu) => {
  if (tabMenu.includes(tabDictionary[tab])) return 6 - tabMenu.length;
  return tab;
};
