/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  createIssue: createIssueQuery,
  createOrganization,
  updateOrganizationArray,
  updateUserArray,
} = require('../../../db');
const { createActivity } = require('../activity');
const {
  createIssueError,
  createIssueSuccess,
  createOrganizationError,
  existingIssueError,
  existingOrganizationError,
  newIssueObject,
  newOrganizationObject,
} = require('./constants');
const { errorLogger } = require('../../../helpers');

const createIssue = async ({ issueInput }, { authError, userId }) => {
  try {
    if (authError || !userId) {
      const error = new Error();
      error.alert = authError;
      throw error;
    }

    const { identiconId, organizationId, organizationRepo, repo } = issueInput;
    const newIssueId = uuidv4();

    if (identiconId && identiconId !== 'undefined') {
      issueInput.organizationLogo = new Identicon(identiconId, 250).toString();
    }

    // Add userId from token
    issueInput.contributor = userId;

    // Populate organization object and create new organization
    const createNewOrganization = async () => {
      if (await checkDuplicateOrganization({ repo: organizationRepo })) {
        const error = new Error();
        error.alert = existingOrganizationError;
        throw error;
      }

      const organizationObject = await newOrganizationObject(issueInput);
      try {
        const result = await createOrganization({ data: organizationObject });
        return result;
      } catch (error) {
        error.alert = createOrganizationError;
        throw error;
      }
    };

    // Check for duplicate issue
    if (await checkDuplicateIssue({ repo })) {
      const error = new Error();
      error.alert = existingIssueError;
      throw error;
    }

    // Check for existing organization. If not: create organization
    if (!organizationId) {
      const organizationResult = await createNewOrganization();

      const activityInput = {
        actionType: 'create',
        organizationId: organizationResult.id,
        userId: organizationResult.ownerId,
      };
      await createActivity({ activityInput });

      issueInput.organizationId = organizationResult.id;
    }

    // Create new issue
    const issueObject = newIssueObject(newIssueId, issueInput);
    const issueResult = await createIssueQuery({ data: issueObject });

    const activityInput = {
      actionType: 'create',
      organizationId: issueResult.organization_id,
      issueId: issueResult.id,
      userId,
    };
    await createActivity({ activityInput });

    // add issue to organization issue list
    await updateOrganizationArray({
      column: 'issues',
      data: newIssueId,
      id: issueInput.organizationId,
      remove: false,
    });

    // add issue to user issue list
    await updateUserArray({
      column: 'issues',
      data: issueResult.id,
      userId,
    });

    // add organization to user list
    await updateUserArray({
      column: 'organizations',
      data: issueInput.organizationId,
      userId,
    });

    return {
      __typename: 'Issue',
      message: createIssueSuccess,
      ...issueResult,
    };
  } catch (error) {
    const { alert } = error;
    errorLogger(error);
    return {
      __typename: 'Error',
      message: alert || createIssueError,
    };
  }
};

module.exports = createIssue;
