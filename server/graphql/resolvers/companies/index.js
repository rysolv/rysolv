const getCompanyPositions = require('./getCompanyPositions');
const getPositionCandidates = require('./getPositionCandidates');
const matchCandidates = require('./matchCandidates');
const oneCompany = require('./oneCompany');
const onePosition = require('./onePosition');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');
const transformPositionResponse = require('./transformPositionResponse');

module.exports = {
  getCompanyPositions,
  getPositionCandidates,
  matchCandidates,
  oneCompany,
  onePosition,
  postContractAccepted,
  transformCompany,
  transformPositionResponse,
};
