/* eslint-disable no-param-reassign */
const Identicon = require('identicon.js');
const { v4: uuidv4 } = require('uuid');

const {
  checkDuplicateIssue,
  checkDuplicateRepo,
  createIssue: createIssueQuery,
  createLanguage,
  createRepo,
  updateRepoArray,
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
  newRepoObject,
} = require('./constants');
const { CustomError, errorLogger } = require('../../../helpers');

const createIssue = async ({ issueInput }, { authError, userId }) => {
  try {
    if (authError || !userId) throw new CustomError(authError);

    const { identiconId, repo, repoId, repoUrl } = issueInput;
    const newIssueId = uuidv4();

    if (identiconId && identiconId !== 'undefined') {
      issueInput.repoLogo = new Identicon(identiconId, 250).toString();
    }

    // Add userId from token
    issueInput.contributor = userId;

    // Populate repo object and create new repo
    const createNewRepo = async () => {
      if (await checkDuplicateRepo({ repo: repoUrl }))
        throw new CustomError(existingRepoError);

      const repoObject = await newRepoObject(issueInput);
      try {
        const result = await createRepo({ data: repoObject });
        return result;
      } catch (error) {
        throw new CustomError(createRepoError);
      }
    };

    // Check for duplicate issue
    if (await checkDuplicateIssue({ repo }))
      throw new CustomError(existingIssueError);

    // Check for existing repo. If not: create repo
    if (!repoId) {
      const repoResult = await createNewRepo();

      const activityInput = {
        actionType: 'create',
        repoId: repoResult.id,
        userId: repoResult.ownerId,
      };
      await createActivity({ activityInput });

      issueInput.repoId = repoResult.id;
    }

    // Create new issue
    const issueObject = newIssueObject(newIssueId, issueInput);
    const issueResult = await createIssueQuery({ data: issueObject });

    if (issueInput.language) {
      await createLanguage({
        languages: issueInput.language,
        target: {
          issueId: newIssueId,
          repoId: issueResult.repo_id,
        },
      });
    }

    const activityInput = {
      actionType: 'create',
      repoId: issueResult.repo_id,
      issueId: issueResult.id,
      userId,
    };
    await createActivity({ activityInput });

    // add issue to repo issue list
    await updateRepoArray({
      column: 'issues',
      data: newIssueId,
      id: issueInput.repoId,
      remove: false,
    });

    // add issue to user issue list
    await updateUserArray({
      column: 'issues',
      data: issueResult.id,
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
