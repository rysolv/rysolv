const { singleQuery } = require('../../baseQueries');

const createLocation = async ({
  companyId,
  country,
  countryCode,
  formattedAddress,
  positionId,
  userId,
  utcOffset,
}) => {
  const values = [
    companyId,
    countryCode,
    country,
    formattedAddress,
    positionId,
    userId,
    utcOffset,
  ];
  const queryText = `
    INSERT INTO locations(
      company_id,
      country_code,
      country,
      formatted_address,
      position_id,
      user_id,
      utc_offset_minutes
    )
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (company_id, position_id, user_id)
    DO UPDATE SET 
      country = EXCLUDED.country,
      country_code = EXCLUDED.country_code,
      formatted_address = EXCLUDED.formatted_address,
      utc_offset_minutes = EXCLUDED.utc_offset_minutes
  `;
  await singleQuery({ queryText, values });
};

module.exports = createLocation;
