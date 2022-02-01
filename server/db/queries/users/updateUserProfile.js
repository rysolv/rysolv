const { singleQuery } = require('../../baseQueries');

// Create user profile
const updateUserProfile = async ({ userProfile }) => {
  const { chartData, userId } = userProfile;
  const queryText = `
    INSERT INTO user_profiles (
      chart_data,
      user_id
    )
    VALUES($1, $2)
    ON CONFLICT (user_id)
    DO UPDATE SET
      chart_data = EXCLUDED.chart_data,
      modified_date = now()
  `;
  await singleQuery({ queryText, values: [chartData, userId] });
};

module.exports = updateUserProfile;
