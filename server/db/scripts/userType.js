const { singleQuery } = require('../baseQueries');

const seedUserType = async () => {
  const queryText = `
      INSERT INTO users(user_type)
      VALUES($1)
    `;
  const values = ['full'];
  await singleQuery({
    queryText,
    values,
  });
};

module.exports = { seedUserType };
