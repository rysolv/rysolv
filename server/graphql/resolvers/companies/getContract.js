/* eslint-disable camelcase */
const { CustomError, errorLogger } = require('../../../helpers');
const { getContractByKey } = require('../../../db');
const { getContractError } = require('./constants');

const getContract = async ({ plan }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const result = await getContractByKey({ key: plan });

    return {
      __typename: 'Contract',
      ...result,
    };
  } catch (error) {
    errorLogger(error);
    return {
      __typename: 'Error',
      message: getContractError,
    };
  }
};

module.exports = getContract;
