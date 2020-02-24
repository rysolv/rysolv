import { CHANGE_RESPONSIVE_VIEW } from './constants';

export function changeResponsiveView(newView) {
  return {
    payload: { newView },
    type: CHANGE_RESPONSIVE_VIEW,
  };
}
