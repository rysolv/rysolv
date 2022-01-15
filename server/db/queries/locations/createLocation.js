/* eslint-disable no-nested-ternary, indent */
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

  const onConflict = companyId
    ? 'company_id'
    : positionId
    ? 'position_id'
    : 'user_id';

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
    ON CONFLICT (${onConflict})
    DO UPDATE SET
      country = EXCLUDED.country,
      country_code = EXCLUDED.country_code,
      formatted_address = EXCLUDED.formatted_address,
      utc_offset_minutes = EXCLUDED.utc_offset_minutes
  `;
  await singleQuery({ queryText, values });
};

module.exports = createLocation;
