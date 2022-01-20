/* eslint-disable sort-keys */

export const deviceSizes = {
  mobileXXS: 320,
  mobileXS: 370,
  mobileS: 395,
  mobile: 600,
  tablet: 768,
  laptopS: 835,
  laptop: 992,
  desktopS: 1100,
  desktop: 1200,
  desktopL: 1440,
};
const MEDIA_DECORATOR = '@media';

export const mediaQueriesByDevice = {
  mobileXXS: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobileXXS}px)`,
  mobileXS: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobileXS}px)`,
  mobileS: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobileS}px)`,
  mobile: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.mobile}px)`,
  tablet: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.tablet}px)`,
  laptopS: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.laptopS}px)`,
  laptop: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.laptop}px)`,
  desktopS: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.desktopS}px)`,
  desktop: `${MEDIA_DECORATOR} (max-width: ${deviceSizes.desktop}px)`,
  desktopL: `${MEDIA_DECORATOR} (min-width: ${deviceSizes.desktopL}px)`,
};
