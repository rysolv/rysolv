const formatParamaters = (array, obj) => {
  // return array of parameters (ex: "id, created_date, modified_date")
  // return substitution string (ex: "$1, $2, $3")
  // return array of values (ex: [12345, 1/1/2020, 1/1/2020])
  const parameters = [];
  const substitution = [];

  const values = array.reduce((acc, key) => {
    if (obj[key]) {
      parameters.push(key);
      substitution.push(`$${acc.length + 1}`);
      acc.push(obj[key]);
    }
    return acc;
  }, []);

  return {
    parameters: parameters.join(),
    substitution: substitution.join(),
    values: [values],
  };
};

module.exports = {
  formatParamaters,
};
