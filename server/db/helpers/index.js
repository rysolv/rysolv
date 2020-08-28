/* eslint-disable no-console */
const { isNull, isUndefined } = require('lodash');

const isDefined = value => !(isNull(value) || isUndefined(value));

// Compare two objects and create a new object with the changes from obj2
//    obj1={first: "Taylor", last: "Maran"};
//    obj2={name: "Tyler"};
//    result = {first: "Tyler", last: "Maran"}
const diff = (obj1, obj2) => {
  const newObject = { ...obj1 };
  const newObjectArray = [];
  const compare = (item1, item2, key) => {
    if (isDefined(item2) && item2 !== item1) {
      newObject[key] = item2;
    }
    newObjectArray.push(newObject[key]);
  };
  Object.keys(obj1).map(key => compare(obj1[key], obj2[key], key));
  return { newObject, newObjectArray };
};

// Format Parameters for node-pg parameterized queries. Returning:
//    parameters: array of parameters (ex: "id, created_date, modified_date")
//    substitution: string (ex: "$1, $2, $3")
//    values: array of values (ex: [12345, 1/1/2020, 1/1/2020])
const formatParameters = ({ newObject, tableParameters }) => {
  const parameters = [];
  const substitution = [];

  const values = tableParameters.reduce((acc, key) => {
    if (newObject[key] !== undefined) {
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

module.exports = { diff, formatParameters };
