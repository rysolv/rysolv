import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AsyncRender from 'components/AsyncRender';
import MessageView from 'components/Messages';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchMessages, sendMessage } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectMessages } from './selectors';

const Messages = ({
  activeUser,
  conversations,
  deviceView,
  dispatchFetchMessages,
  dispatchSendMessage,
  error,
  loading,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Messages';
    dispatchFetchMessages();
  }, []);

  return (
    <AsyncRender
      asyncData={conversations}
      component={MessageView}
      error={error}
      isRequiredData
      loading={loading}
      propsToPassDown={{
        activeUser,
        conversations,
        deviceView,
        dispatchSendMessage,
      }}
    />
  );
};

Messages.propTypes = {
  activeUser: T.object.isRequired,
  conversations: T.array.isRequired,
  deviceView: T.string.isRequired,
  dispatchFetchMessages: T.func.isRequired,
  dispatchSendMessage: T.func.isRequired,
  error: T.string,
  loading: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : messages
   */
  error: makeSelectMessages('error'),
  loading: makeSelectMessages('loading'),
  conversations: makeSelectMessages('conversations'),
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
