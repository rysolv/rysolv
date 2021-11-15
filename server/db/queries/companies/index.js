const createCompany = require('./createCompany');
const createCompanyPosition = require('./createCompanyPosition');
const createMessage = require('./createMessage');
const deletePosition = require('./deletePosition');
const getCompanyPositions = require('./getCompanyPositions');
const getOneCompany = require('./getOneCompany');
const getOnePosition = require('./getOnePosition');
const getPositionCandidates = require('./getPositionCandidates');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');

module.exports = {
  createCompany,
  createCompanyPosition,
  createMessage,
  deletePosition,
  getCompanyPositions,
  getOneCompany,
  getOnePosition,
  getPositionCandidates,
  postContractAccepted,
  transformCompany,
};