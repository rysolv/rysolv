const analyzeUser = require('./analyzeUser');
const emailHelper = require('./emailHelper');
const functions = require('./functions');

module.exports = {
  ...analyzeUser,
  ...emailHelper,
  ...functions,
};
