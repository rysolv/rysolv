/* eslint-disable camelcase */
const { FETCH } = require('../helpers');
const { formatIssueUrl, formatOrganizationUrl } = require('./helpers');

const getSingleIssue = async issueUrl => {
  try {
    const formattedUrl = formatIssueUrl(issueUrl);

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

const getSingleRepo = async organizationUrl => {
  try {
    const { type, formattedUrl } = formatOrganizationUrl(organizationUrl);

    if (type === 'organization') {
      return await getSingleOrganization(formattedUrl);
    }

    const organizationData = await FETCH(formattedUrl);

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
      const {
        name: parentName,
        avatar_url,
        html_url: parentRepo,
        blog,
        bio,
      } = parentOrganization;

      organizationInput.organizationName = parentName;
      organizationInput.organizationLogo = avatar_url;
      organizationInput.organizationRepo = parentRepo;
      organizationInput.organizationUrl = blog;
      if (bio) organizationInput.organizationDescription = bio;
    }

    return { organizationInput };
  } catch (err) {
    throw err;
  }
};

const getSingleOrganization = async value => {
  const organizationData = await FETCH(value);
  const { avatar_url, bio, blog, html_url, name, type } = organizationData;
  if (type === 'User') {
    throw new Error('Cannot import user account as organization');
  }
  const organizationInput = {
    organizationDescription: bio || '',
    organizationName: name,
    organizationRepo: html_url,
    organizationUrl: blog,
    organizationLanguages: [],
    organizationLogo: avatar_url,
  };

  return { organizationInput };
};

module.exports = {
  getSingleRepo,
  getSingleIssue,
  getSingleOrganization,
};
