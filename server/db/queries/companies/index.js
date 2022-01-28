const createCompany = require('./createCompany');
const createCompanyPosition = require('./createCompanyPosition');
const deletePositionResponse = require('./deletePositionResponse');
const deleteUserCompanies = require('./deleteUserCompanies');
const getAllCandidates = require('./getAllCandidates');
const getCompanyContact = require('./getCompanyContact');
const getCompanyPositions = require('./getCompanyPositions');
const getContractByKey = require('./getContractByKey');
const getOneCompany = require('./getOneCompany');
const getOnePosition = require('./getOnePosition');
const getPositionCandidates = require('./getPositionCandidates');
const getPositions = require('./getPositions');
const insertUserCompany = require('./insertUserCompany');
const matchCandidates = require('./matchCandidates');
const postContractAccepted = require('./postContractAccepted');
const saveCandidate = require('./saveCandidate');
const setPositionAppliedDate = require('./setPositionAppliedDate');
const transformCompany = require('./transformCompany');

module.exports = {
  createCompany,
  createCompanyPosition,
  deletePositionResponse,
  deleteUserCompanies,
  getAllCandidates,
  getCompanyContact,
  getCompanyPositions,
  getContractByKey,
  getOneCompany,
  getOnePosition,
  getPositionCandidates,
  getPositions,
  insertUserCompany,
  matchCandidates,
  postContractAccepted,
  saveCandidate,
  setPositionAppliedDate,
  transformCompany,
};
