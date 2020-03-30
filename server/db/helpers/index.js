/* eslint-disable no-console */
// compare two objects and return a new object
const diff = (obj1, obj2) => {
  const newObject = { ...obj1 };
  const newObjectArray = [];
  const compare = (item1, item2, key) => {
    if (item2 && item2 !== item1) {
      newObject[key] = item2;
    }
    newObjectArray.push(newObject[key]);
  };

  Object.keys(obj1).map(key => compare(obj1[key], obj2[key], key));

  // console.log(newObject);
  // console.log(newObjectArray);
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

module.exports = { diff, testDiff };
// require('make-runnable');
