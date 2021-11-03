const { CustomError, errorLogger } = require('../../../helpers');
const {
  getUserSettings: getUserSettingsQuery,
  getRecommendedIssues,
  getFilteredIssues,
  getQuestionAnswerByKey,
  getSurveyStatus,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserDashboard = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    // Get user info
    const user = await getUserSettingsQuery({ userId });

    // Get recommended issues
    const issues = await getRecommendedIssues({ userId });
    user.issues = issues;

    // Get hiring status
    const responseKey = await getQuestionAnswerByKey({
      userId,
      questionKey: 'timeline',
    });

    // Get hiring survey status
    user.surveyComplete = await getSurveyStatus({ userId });

    // If there aren't enough recommended issues
    // (or no user languages), then supplement with new issues
    if (issues.length < 20) {
      const newIssues = await getFilteredIssues({ limit: 20, order: 'new' });
      issues.push(...newIssues);
    }

    // User Hiring Staus
    // Options: active | inactive | undeclared
    if (responseKey && responseKey === '0_months') {
      user.hiringStatus = 'active';
    } else if (responseKey === 'indefinite') {
      user.hiringStatus = 'inactive';
    } else {
      user.hiringStatus = 'undeclared';
    }

    return {
      __typename: 'User',
      ...user,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || getUserSettingsError,
    };
  }
};

module.exports = getUserDashboard;
