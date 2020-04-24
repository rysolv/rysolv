const { v4: uuidv4 } = require('uuid');
const {
  // createOrganization,
  // deleteOrganization,
  // getOneOrganization,
  // getOneUser,
  getComments,
  getIssueComments,
  createComment,
  updateIssueArray,
  updateUserArray,
  // searchOrganizations,
  // transformOrganization,
} = require('../../db');

module.exports = {
  // createOrganization: async args => {
  //   const { organizationInput } = args;
  //   const organization = [
  //     [
  //       uuidv4(),
  //       new Date(),
  //       new Date(),
  //       organizationInput.name,
  //       organizationInput.description,
  //       organizationInput.repoUrl,
  //       organizationInput.companyUrl || '',
  //       organizationInput.issues || [],
  //       organizationInput.logo || '',
  //       organizationInput.verified || false,
  //     ],
  //   ];
  //   try {
  //     const result = await createOrganization(organization);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  // deleteOrganization: async args => {
  //   const { id } = args;
  //   try {
  //     const result = await deleteOrganization('organizations', id);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  createComment: async args => {
    const { commentInput } = args;
    const comment = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        commentInput.target,
        commentInput.body || '',
        commentInput.user,
      ],
    ];
    const [result] = await createComment(comment);

    const [user] = await updateUserArray(
      'users',
      'comments',
      commentInput.user,
      result.id,
    );
    await updateIssueArray(
      'issues',
      'comments',
      commentInput.target,
      result.id,
    );

    return {
      commentId: result.id,
      createdDate: result.created_date,
      modifiedDate: result.modified_date,
      target: result.target,
      body: result.body,
      userId: result.user_id,
      username: user.username,
      profilePic: user.profile_pic,
    };
  },
  getComments: async () => {
    try {
      const result = await getComments('comments');
      return result;
    } catch (err) {
      throw err;
    }
  },
  getIssueComments: async args => {
    const { id } = args;
    try {
      const result = await getIssueComments('comments', id);
      return result;
    } catch (err) {
      return {
        __typename: 'Error',
        message: err.message,
      };
    }
  },
  // searchOrganizations: async args => {
  //   const { value } = args;
  //   try {
  //     const result = await searchOrganizations('organizations', value);
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
  // transformOrganization: async args => {
  //   const { id, organizationInput } = args;
  //   try {
  //     const data = {
  //       modified_date: new Date(), // update modified date
  //       name: organizationInput.name,
  //       description: organizationInput.description,
  //       repo_url: organizationInput.repoUrl,
  //       companyUrl: organizationInput.companyUrl,
  //       issues: organizationInput.issues,
  //       logo: organizationInput.logo,
  //       verified: organizationInput.verified,
  //     };
  //     const queryResult = await transformOrganization(
  //       'organizations',
  //       id,
  //       data,
  //     );
  //     const result = {
  //       id: queryResult.id,
  //       createdDate: queryResult.created_date,
  //       modifiedDate: queryResult.modified_date,
  //       name: queryResult.name,
  //       description: queryResult.description,
  //       repoUrl: queryResult.repo_url,
  //       companyUrl: queryResult.companyUrl,
  //       issues: queryResult.issues,
  //       logo: queryResult.logo,
  //       verified: queryResult.verified,
  //     };
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // },
};
