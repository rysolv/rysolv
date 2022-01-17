import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectMessagesDomain = state => state.messages || initialState;

const selectMessagesProps = (state, props) => props;

const makeSelectMessages = prop =>
  createSelector(
    selectMessagesDomain,
    substate => substate[prop],
  );

const makeSelectMessagesIsThreadView = () =>
  createSelector(
    selectMessagesProps,
    props => !!props.match.params.threadId,
  );

export default selectMessagesDomain;
export { makeSelectMessages, makeSelectMessagesIsThreadView };
