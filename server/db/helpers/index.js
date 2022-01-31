// Format Parameters for node-pg parameterized queries. Returning:
//    parameters: array of parameters (ex: "id, created_date, modified_date")
//    substitution: string (ex: "$1, $2, $3")
//    values: array of values (ex: [12345, 1/1/2020, 1/1/2020])
const formatParameters = ({ newObject, tableParameters }) => {
  const parameters = [];
  const substitution = [];

  const values = tableParameters.reduce((acc, key) => {
    if (newObject[key] !== undefined && newObject[key] !== 'null') {
      parameters.push(key);
      substitution.push(`$${acc.length + 1}`);
      acc.push(newObject[key]);
    }
    return acc;
  }, []);

  return {
    parameters: parameters.join(),
    substitution: substitution.join(),
    values,
  };
};

module.exports = { formatParameters };
