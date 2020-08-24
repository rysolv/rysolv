/* eslint-disable no-console */
const { isNull, isUndefined } = require('lodash');

const isDefined = value => !(isNull(value) || isUndefined(value));

// compare two objects and return a new combined object
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

const testDiff = () => {
  const test1 = {
    first_name: 'Taylor',
    last_name: 'Marafsdffaan',
    email: 'tyler.maran@gmail.com',
    username: 'themanmaran',
  };
  const test2 = {
    first_name: 'Tyler',
    last_name: 'Maran',
    email: 'tyler.maran@gmail.com',
  };
  diff(test1, test2);
};

const formatParamaters = (array, obj) => {
  // return array of parameters (ex: "id, created_date, modified_date")
  // return substitution string (ex: "$1, $2, $3")
  // return array of values (ex: [12345, 1/1/2020, 1/1/2020])
  const parameters = [];
  const substitution = [];

  const values = array.reduce((acc, key) => {
    if (obj[key] !== undefined) {
      parameters.push(key);
      substitution.push(`$${acc.length + 1}`);
      acc.push(obj[key]);
    }
    return acc;
  }, []);

  return {
    parameters: parameters.join(),
    substitution: substitution.join(),
    values,
  };
};

module.exports = { diff, testDiff, formatParamaters };
// require('make-runnable');
