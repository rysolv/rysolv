const getCompanyPositions = require('./getCompanyPositions');
const getContract = require('./getContract');
const getPlaidToken = require('./getPlaidToken');
const getPositionCandidates = require('./getPositionCandidates');
const matchCandidates = require('./matchCandidates');
const oneCompany = require('./oneCompany');
const onePosition = require('./onePosition');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');
const transformPositionResponse = require('./transformPositionResponse');
const updatePaymentMethod = require('./updatePaymentMethod');

module.exports = {
  getCompanyPositions,
  getContract,
  getPlaidToken,
  getPositionCandidates,
  matchCandidates,
  oneCompany,
  onePosition,
  postContractAccepted,
  transformCompany,
  transformPositionResponse,
  updatePaymentMethod,
};
