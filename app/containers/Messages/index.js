import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ConditionalRender } from 'components/base_ui';
import MessagesView from 'components/Messages';
import NoMessages from 'components/Messages/NoMessages';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  fetchMessages,
  resetMarkdown,
  sendMessage,
  setReadReceipt,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectMessages,
  makeSelectMessagesIsThreadView,
} from './selectors';
import { ViewContainer } from './styledComponents';

const Messages = ({
  activeUser,
  conversations,
  deviceView,
  dispatchFetchMessages,
  dispatchResetMarkdown,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  isThreadView,
  loading,
  match: {
    params: { threadId },
  },
  success,
}) => {
  // If no URL param, set most recent conversation as active
  const [activeConversation, setActiveConversation] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Messages';
    dispatchFetchMessages();
  }, []);

  useEffect(() => {
    conversations.forEach((el, i) => {
      if (el.threadId === threadId) setActiveConversation(i);
    });
  }, [threadId]);

  const isCompany = !!activeUser.company;

  const ComponentToRender = props => (
    <ConditionalRender
      Component={MessagesView}
      FallbackComponent={NoMessages}
      propsToPassDown={props}
      shouldRender={!!conversations.length}
    />
  );

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={conversations}
        component={ComponentToRender}
        error={error.main}
        loading={loading.main}
        propsToPassDown={{
          activeConversation,
          activeUser,
          conversations,
          deviceView,
          dispatchResetMarkdown,
          dispatchSendMessage,
          dispatchSetReadReceipt,
          error,
          handleNav,
          isCompany,
          isThreadView,
          loading,
          setActiveConversation,
          success,
        }}
      />
    </ViewContainer>
  );
};

Messages.propTypes = {
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchFetchMessages: T.func.isRequired,
  dispatchResetMarkdown: T.func.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.object.isRequired,
  handleNav: T.func.isRequired,
  isThreadView: T.bool.isRequired,
  loading: T.object.isRequired,
  match: T.object.isRequired,
  success: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : Messages
   */
  conversations: makeSelectMessages('conversations'),
  error: makeSelectMessages('error'),
  isThreadView: makeSelectMessagesIsThreadView(),
  loading: makeSelectMessages('loading'),
  success: makeSelectMessages('success'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Messages
     */
    dispatchFetchMessages: () => dispatch(fetchMessages()),
    dispatchResetMarkdown: () => dispatch(resetMarkdown()),
    dispatchSendMessage: payload => dispatch(sendMessage(payload)),
    dispatchSetReadReceipt: payload => dispatch(setReadReceipt(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'messages', reducer });
const withSaga = injectSaga({ key: 'messages', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Messages);
