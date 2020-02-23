import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectViewSizeDomain = state => state.viewSize || initialState;

const makeSelectViewSize = prop =>
  createSelector(
    selectViewSizeDomain,
    viewState => viewState[prop],
  );

export default makeSelectViewSize;
export { selectViewSizeDomain };
