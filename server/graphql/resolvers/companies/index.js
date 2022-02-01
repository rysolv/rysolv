const getCandidateCount = require('./getCandidateCount');
const getCompanyPositions = require('./getCompanyPositions');
const getContract = require('./getContract');
const getPlaidToken = require('./getPlaidToken');
const getPositionCandidates = require('./getPositionCandidates');
const getPositions = require('./getPositions');
const matchCandidates = require('./matchCandidates');
const oneCompany = require('./oneCompany');
const onePosition = require('./onePosition');
const postContractAccepted = require('./postContractAccepted');
const saveCandidate = require('./saveCandidate');
const transformCompany = require('./transformCompany');
const transformPositionResponse = require('./transformPositionResponse');
const updatePaymentMethod = require('./updatePaymentMethod');

module.exports = {
  getCandidateCount,
  getCompanyPositions,
  getContract,
  getPlaidToken,
  getPositionCandidates,
  getPositions,
  matchCandidates,
  oneCompany,
  onePosition,
  postContractAccepted,
  saveCandidate,
  transformCompany,
  transformPositionResponse,
  updatePaymentMethod,
};
