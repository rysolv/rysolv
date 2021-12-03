const createCompany = require('./createCompany');
const createCompanyPosition = require('./createCompanyPosition');
const deletePosition = require('./deletePosition');
const deleteUserCompanies = require('./deleteUserCompanies');
const getCompanyPositions = require('./getCompanyPositions');
const getOneCompany = require('./getOneCompany');
const getOnePosition = require('./getOnePosition');
const getPositionCandidates = require('./getPositionCandidates');
const insertUserCompany = require('./insertUserCompany');
const postContractAccepted = require('./postContractAccepted');
const transformCompany = require('./transformCompany');

module.exports = {
  createCompany,
  createCompanyPosition,
  deletePosition,
  deleteUserCompanies,
  getCompanyPositions,
  getOneCompany,
  getOnePosition,
  getPositionCandidates,
  insertUserCompany,
  postContractAccepted,
  transformCompany,
};
