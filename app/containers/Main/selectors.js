import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectMainDomain = state => state.main || initialState;

const makeSelectMain = prop =>
  createSelector(
    selectMainDomain,
    substate => substate[prop],
  );

const makeSelectModalProps = prop =>
  createSelector(
    makeSelectMain('isModalOpen'),
    isModalOpen => isModalOpen[prop],
  );

export default selectMainDomain;
export { makeSelectMain, makeSelectModalProps };
