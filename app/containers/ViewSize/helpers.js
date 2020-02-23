import { deviceSizes } from 'utils/breakpoints';

export const deviceViewToRender = width => {
  const { laptop, mobileL, mobileS, tablet, tabletS, tabletXS } = deviceSizes;
  const isMobileTabletDevice = /Mobi/.test(navigator.userAgent);
  if (width <= mobileS) return 'mobileS';
  if (width <= mobileL) return 'mobileL';
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
