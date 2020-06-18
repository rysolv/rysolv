import { deviceSizes } from 'utils/breakpoints';

export const deviceViewToRender = width => {
  const {
    laptop,
    mobile,
    mobileS,
    mobileXS,
    mobileXXS,
    tablet,
    tabletS,
    tabletXS,
  } = deviceSizes;
  const isMobileTabletDevice = /Mobi/.test(navigator.userAgent);
  if (width <= mobileXXS) return 'mobileXXS';
  if (width <= mobileXS) return 'mobileXS';
  if (width <= mobileS) return 'mobileS';
  if (width <= mobile) return 'mobile';
  // catch any ipad or tablets that have a 1024 screen
  if (width <= tablet || (isMobileTabletDevice && width > tablet)) {
    if (width <= tabletXS) return 'tabletXS';
    if (width <= tabletS) return 'tabletS';
    return 'tablet';
  }
  if (width <= laptop) {
    return 'laptop';
  }
  return 'desktop';
};
