import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectUserProfileDomain = state => state.user || initialState;
const selectUserProfileProps = (state, props) => props;

const makeSelectUserProfile = prop =>
  createSelector(
    selectUserProfileDomain,
    substate => substate[prop],
  );

const makeSelectUserProfileParams = () =>
  createSelector(
    selectUserProfileProps,
    props => props.match.params.user,
  );

export default selectUserProfileDomain;
export { makeSelectUserProfile, makeSelectUserProfileParams };
