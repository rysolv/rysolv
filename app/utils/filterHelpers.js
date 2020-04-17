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
