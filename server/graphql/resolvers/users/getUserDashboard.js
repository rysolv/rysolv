const isEmpty = require('lodash/isEmpty');

const { CustomError, errorLogger } = require('../../../helpers');
const {
  getFilteredIssues,
  getQuestionAnswerByKey,
  getRecommendedIssues,
  getRecommendedPositions,
  getSurveyStatus,
  getUserSettings: getUserSettingsQuery,
} = require('../../../db');
const { getUserSettingsError } = require('./constants');

const getUserDashboard = async (_, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    // Get user info
    const user = await getUserSettingsQuery({ userId });

    // Get recommended issues
    const issues = await getRecommendedIssues({ userId });
    user.issues = issues || [];

    // Get recommended jobs
    const jobs = await getRecommendedPositions();
    user.jobs = jobs || [];

    // Get hiring status
    const responseKey = await getQuestionAnswerByKey({
      userId,
      questionKey: 'is_active',
    });

    // Get hiring survey status
    user.surveyComplete = await getSurveyStatus({ userId });

    // If there aren't enough recommended issues
    // (or no user languages), then supplement with new issues
    if (user.issues.length < 20) {
      const newIssues = await getFilteredIssues({ limit: 20, order: 'new' });
      user.issues.push(...newIssues);
    }

    // User Hiring Staus
    // Options: active | inactive | undeclared
    if (responseKey && responseKey === 'yes_is_active') {
      user.hiringStatus = 'active';
    } else if (responseKey === 'no_is_active') {
      user.hiringStatus = 'inactive';
    } else {
      user.hiringStatus = 'undeclared';
    }

    if (!isEmpty(user.skills)) {
      const skillsArray = user.skills.map(({ level, name }) => ({
        beginner: level === 1,
        expert: level === 3,
        intermediate: level === 2,
        skill: name,
      }));
      user.skills = skillsArray;
    } else {
      user.skills = [];
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
