/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  createIssue: createIssueQuery,
  createLanguage,
  createRepo,
  updateOrganizationArray,
  updateUserArray,
} = require('../../../db');
const { createActivity } = require('../activity');
const {
  createIssueError,
  createIssueSuccess,
  createRepoError,
  existingIssueError,
  existingRepoError,
  newIssueObject,
  newOrganizationObject,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createIssue = async ({ issueInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { identiconId, organizationId, repo, repoUrl } = issueInput;
    const newIssueId = uuidv4();

    if (identiconId && identiconId !== 'undefined') {
      issueInput.organizationLogo = new Identicon(identiconId, 250).toString();
    }

    // Add userId from token
    issueInput.contributor = userId;

    // Populate repo object and create new repo
    const createNewRepo = async () => {
      if (await checkDuplicateOrganization({ repo: repoUrl }))
        throw new CustomError(existingRepoError);

      const organizationObject = await newOrganizationObject(issueInput);
      try {
        const result = await createRepo({ data: organizationObject });
        return result;
      } catch (error) {
        throw new CustomError(createRepoError);
      }
    };

    // Check for duplicate issue
    if (await checkDuplicateIssue({ repo }))
      throw new CustomError(existingIssueError);

    // Check for existing organization. If not: create organization
    if (!organizationId) {
      const organizationResult = await createNewRepo();

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

    if (issueInput.language) {
      await createLanguage({
        languages: issueInput.language,
        target: {
          issueId: newIssueId,
          organizationId: issueResult.organization_id,
        },
      });
    }

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
      column: 'repos',
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
