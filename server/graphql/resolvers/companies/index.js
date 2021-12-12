const getCompanyPositions = require('./getCompanyPositions');
const getContract = require('./getContract');
const getPositionCandidates = require('./getPositionCandidates');
const matchCandidates = require('./matchCandidates');
const oneCompany = require('./oneCompany');
const onePosition = require('./onePosition');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');
const transformPosition = require('./transformPosition');
const updatePaymentMethod = require('./updatePaymentMethod');

module.exports = {
  getCompanyPositions,
  getContract,
  getPositionCandidates,
  matchCandidates,
  oneCompany,
  onePosition,
  postContractAccepted,
  transformCompany,
  transformPosition,
  updatePaymentMethod,
};
