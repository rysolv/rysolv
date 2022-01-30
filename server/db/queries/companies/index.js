const createCompany = require('./createCompany');
const createCompanyPosition = require('./createCompanyPosition');
const deletePositionResponse = require('./deletePositionResponse');
const deleteUserCompanies = require('./deleteUserCompanies');
const getAllCandidates = require('./getAllCandidates');
const getCandidateCount = require('./getCandidateCount');
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
const setCandidateViewedDate = require('./setCandidateViewedDate');
const setPositionAppliedDate = require('./setPositionAppliedDate');
const transformCompany = require('./transformCompany');

module.exports = {
  createCompany,
  createCompanyPosition,
  deletePositionResponse,
  deleteUserCompanies,
  getAllCandidates,
  getCandidateCount,
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
  setCandidateViewedDate,
  setPositionAppliedDate,
  transformCompany,
};
