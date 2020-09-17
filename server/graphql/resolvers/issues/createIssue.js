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
const { newIssueObject, newOrganizationObject } = require('./constants');

const createIssue = async args => {
  const { issueInput } = args;
  const { identiconId, organizationId, organizationRepo, repo } = issueInput;
  const newIssueId = uuidv4();

  if (identiconId && identiconId !== 'undefined') {
    issueInput.organizationLogo = new Identicon(identiconId, 250).toString();
  }

  // Populate issue object and create new issue
  const createNewIssue = async () => {
    const issueObject = newIssueObject(newIssueId, issueInput);
    try {
      const result = await createIssueQuery({ data: issueObject });
      return result;
    } catch (err) {
      throw err;
    }
  };

  // Populate organization object and create new organization
  const createNewOrganization = async () => {
    // backup check
    if (await checkDuplicateOrganization({ repo: organizationRepo })) {
      throw new Error(
        `Organization at ${issueInput.organizationRepo} already exists`,
      );
    }

    const organizationObject = await newOrganizationObject(issueInput);
    try {
      const result = await createOrganization({ data: organizationObject });
      return result;
    } catch (err) {
      throw err;
    }
  };

  try {
    // Check for duplicate issue
    if (await checkDuplicateIssue({ repo })) {
      throw new Error(`Issue at ${repo} already exists`);
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
    const issueResult = await createNewIssue();

    const activityInput = {
      actionType: 'create',
      organizationId: issueResult.organization_id,
      issueId: issueResult.id,
      userId: issueResult.contributor_id,
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
      userId: issueInput.contributor,
    });

    // add organization to user list
    await updateUserArray({
      column: 'organizations',
      data: issueInput.organizationId,
      userId: issueInput.contributor,
    });

    return {
      __typename: 'Issue',
      ...issueResult,
    };
  } catch (err) {
    return {
      __typename: 'Error',
      message: err.message,
    };
  }
};

module.exports = createIssue;
