/* eslint-disable camelcase */
const { FETCH } = require('../helpers');
const { formatUrl } = require('./helpers');

const getSingleIssue = async issueUrl => {
  const formattedUrl = formatUrl(issueUrl);

  try {
    const issueData = await FETCH(formattedUrl);
    const { html_url, title, state, body, repository_url } = issueData;
    if (state !== 'open') {
      throw new Error('Cannot add closed issue');
    }

    const issueInput = {
      issueBody: body,
      issueName: title,
      issueUrl: html_url,
      organizationUrl: repository_url,
    };

    return { issueInput };
  } catch (err) {
    throw err;
  }
};

const getSingleOrganization = async organizationUrl => {
  try {
    const organizationData = await FETCH(organizationUrl);
    const {
      description,
      homepage,
      html_url,
      language,
      name,
      organization,
    } = organizationData;

    const organizationInput = {
      issueLanguages: [language],
      organizationDescription: description,
      organizationName: name,
      organizationRepo: html_url,
      organizationUrl: homepage,
      organizationLanguages: [language],
    };

    if (organization) {
      // If repo has parent organization - pull data from parent
      const parentOrganization = await FETCH(organization.url);
      const { name: parentName, avatar_url } = parentOrganization;

      organizationInput.organizationName = parentName;
      organizationInput.organizationLogo = avatar_url;
    }

    return { organizationInput };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getSingleIssue,
  getSingleOrganization,
};
