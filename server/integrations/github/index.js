/* eslint-disable camelcase */
const fetch = require('node-fetch');
const { formatUrl } = require('./helpers');

const getSingleIssue = async issueUrl => {
  const formattedUrl = formatUrl(issueUrl);

  const requestOptions = {
    method: 'GET',
    redirect: 'follow',
  };

  try {
    const issueRequest = await fetch(formattedUrl, requestOptions);
    const issueData = await issueRequest.json();
    const { html_url, title, state, body, repository_url } = issueData;

    const organizationRequest = await fetch(repository_url, requestOptions);
    const organizationData = await organizationRequest.json();
    const {
      description,
      html_url: repo_url,
      language,
      name,
    } = organizationData;

    const issueInput = {
      body,
      repo: html_url,
      open: state === 'open',
      organization: repository_url,
      language: [language],
      name: title,
    };

    const organizationInput = {
      organizationDescription: description,
      preferred_languages: [language],
      organizationName: name,
      organizationRepo: repo_url,
    };

    return { issueInput, organizationInput };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getSingleIssue,
};
