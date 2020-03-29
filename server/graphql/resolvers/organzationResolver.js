const { v4: uuidv4 } = require('uuid');
const {
  createOrganization,
  getOrganizations,
  getOneOrganization,
  deleteOrganization,
  transformOrganization,
} = require('../../db');

module.exports = {
  getOrganizations: async () => {
    try {
      const result = await getOrganizations('organizations');
      return result;
    } catch (err) {
      throw err;
    }
  },
  oneOrganization: async args => {
    const { id } = args;
    try {
      const [result] = await getOneOrganization('organizations', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
  createOrganization: async args => {
    const { organizationInput } = args;
    const organization = [
      [
        uuidv4(),
        new Date(),
        new Date(),
        organizationInput.name,
        organizationInput.description,
        organizationInput.repo_url,
        organizationInput.website,
        organizationInput.issues,
        organizationInput.logo,
        organizationInput.verified,
      ],
    ];
    try {
      const result = await createOrganization(organization);
      return result;
    } catch (err) {
      throw err;
    }
  },
  transformOrganization: async args => {
    const { id, organizationInput } = args;
    try {
      const data = [
        [
          new Date(), // update modified date
          organizationInput.name,
          organizationInput.description,
          organizationInput.repo_url,
          organizationInput.website,
          organizationInput.issues,
          organizationInput.logo,
          organizationInput.verified,
        ],
      ];
      const result = await transformOrganization('organizations', id, data);
      return result;
    } catch (err) {
      throw err;
    }
  },
  deleteOrganization: async args => {
    const { id } = args;
    try {
      const result = await deleteOrganization('organizations', id);
      return result;
    } catch (err) {
      throw err;
    }
  },
};
