import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import { BackNav, ConditionalRender } from 'components/base_ui';
import AsyncRender from 'components/AsyncRender';
import MessageView from 'components/Messages';
import NoMessages from 'components/Messages/NoMessages';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchMessages, sendMessage, setReadReceipt } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectMessages } from './selectors';

const Messages = ({
  activeUser,
  conversations,
  deviceView,
  dispatchFetchMessages,
  dispatchSendMessage,
  dispatchSetReadReceipt,
  error,
  handleNav,
  loading,
  match: {
    params: { threadId },
  },
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

  const componentToRender = props => (
    <ConditionalRender
      Component={MessageView}
      FallbackComponent={NoMessages}
      propsToPassDown={props}
      shouldRender={!!conversations.length}
    />
  );
  const isCompany = !!activeUser.company;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <BackNav
        label="Back to Dashboard"
        path={isCompany ? '/company/dashboard' : '/dashboard'}
      />
      <AsyncRender
        asyncData={conversations}
        component={componentToRender}
        error={error}
        loading={loading}
        propsToPassDown={{
          activeConversation,
          activeUser,
          conversations,
          deviceView,
          dispatchSendMessage,
          dispatchSetReadReceipt,
          handleNav,
          setActiveConversation,
        }}
      />
    </div>
  );
};

Messages.propTypes = {
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchFetchMessages: T.func.isRequired,
  dispatchSendMessage: T.func.isRequired,
  dispatchSetReadReceipt: T.func.isRequired,
  error: T.string,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : messages
   */
  conversations: makeSelectMessages('conversations'),
  error: makeSelectMessages('error'),
  loading: makeSelectMessages('loading'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : messages
     */
    dispatchFetchMessages: () => dispatch(fetchMessages()),
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
