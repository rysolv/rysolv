/* eslint-disable sort-keys */

export const deviceSizes = {
  mobile: 600,
  tablet: 768,
  laptop: 992,
  desktop: 1200,
  large: 1440,
};
const MEDIA_DECORATOR = '@media';

export const mediaQueriesByDevice = {
  mobile: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobile}px)`,
  tablet: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.tablet}px)`,
  laptop: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.laptop}px)`,
  desktop: `${MEDIA_DECORATOR} (min-width: ${deviceSizes.desktop}px)`,
  large: `${MEDIA_DECORATOR} (min-width: ${deviceSizes.large}px)`,
};
