/* eslint-disable no-nested-ternary, prettier/prettier */
export const filterContributors = (array, { value }) => {
  const filteredArray = array.filter(({ firstName, lastName, username }) => {
    if (
      firstName.toLowerCase().includes(value.toLowerCase()) ||
      lastName.toLowerCase().includes(value.toLowerCase()) ||
      username.toLowerCase().includes(value.toLowerCase())
    ) {
      return true;
    }
    return false;
  });

  return filteredArray;
};

export const filterIssues = (array, { issues }, { value }) => {
  // eslint-disable-next-line array-callback-return, consistent-return
  const sortedArray = array.sort((a, b) => {
    if (issues === 'Newest') {
      if (a.modifiedDate < b.modifiedDate) {
        return 1
      } 
      return -1;
    }
    if (issues === 'Most Funded') {
      if (a.fundedAmount < b.fundedAmount) {
        return 1
      }
      return -1;
    }
  }
  );
  const filteredArray = sortedArray.filter(({ name }) => {
    if (name.toLowerCase().includes(value.toLowerCase())) {
      return true;
    }
    return false;
  });
  return filteredArray;
};
