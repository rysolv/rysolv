export const filterCandidates = (candidates, filterParams) => {
  const {
    location: locationFilter,
    salary: salaryFilter,
    step: stepFilter,
    type: typeFilter,
  } = filterParams;

  const filteredCandidates = candidates.filter(
    ({ isSaved, location, salary, type }) => {
      if (!isSaved && stepFilter === 'Shortlisted') return false;
      if (location !== locationFilter && !!locationFilter) return false;
      if (salary >= salaryFilter) return false;
      if (type !== typeFilter && !!typeFilter) return false;
      return true;
    },
  );
  return filteredCandidates;
};
