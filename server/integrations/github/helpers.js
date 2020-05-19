const formatUrl = githubUrl => {
  const split = githubUrl.split('/');

  const validArray = Array.isArray(split);
  const includesGithub = split.includes('github.com');
  const includesIssues = split.includes('issues');

  if (validArray && includesGithub && includesIssues && split.length > 4) {
    const issueNumber = split[split.length - 1];
    const repo = split[split.length - 3];
    const organization = split[split.length - 4];
    return `https://api.github.com/repos/${organization}/${repo}/issues/${issueNumber}`;
  }
  throw new Error('Not a valid github url');
};

module.exports = {
  formatUrl,
};
