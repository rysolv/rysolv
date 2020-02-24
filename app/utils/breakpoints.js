/* eslint-disable sort-keys */

export const deviceSizes = {
  mobile: 500,
  tablet: 780,
  laptop: 969,
  desktop: 970,
};
const MEDIA_DECORATOR = '@media';

export const mediaQueriesByDevice = {
  mobile: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobileL}px)`,
  tablet: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.tablet}px)`,
  laptop: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.laptop}px)`,
  desktop: `${MEDIA_DECORATOR} (min-width: ${deviceSizes.desktop}px)`,
};
