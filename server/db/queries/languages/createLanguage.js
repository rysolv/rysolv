const { v4: uuidv4 } = require('uuid');

const { singleQuery } = require('../../baseQueries');

// Add language to table
const createLanguage = async ({ languages, preferred, target }) => {
  languages.map(async language => {
    const isLanguageDefined =
      language !== '' && language !== null && language !== undefined;

    if (isLanguageDefined) {
      const values = [
        uuidv4(),
        language,
        preferred || false,
        target.issueId || null,
        target.repoId || null,
        target.userId || null,
      ];

      const queryText = `
        INSERT INTO
        languages(id, language, preferred, issue_id, repo_id, user_id)
        VALUES($1, $2, $3, $4, $5, $6)
      `;

      await singleQuery({ queryText, values });
    }
  });
};

module.exports = createLanguage;
