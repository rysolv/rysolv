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
      utc_offset
    )
    VALUES($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT DO UPDATE SET (
      country_code = EXCLUDED.country_code,
      country = EXCLUDED.country,
      formatted_address = EXCLUDED.formatted_address,
      utc_offset = EXCLUDED.utc_offset
    )
  `;
  await singleQuery({ queryText, values });
};

module.exports = createLocation;
