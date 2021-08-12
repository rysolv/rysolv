import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect, withRouter } from 'react-router-dom';

import { ConditionalRender } from 'components/base_ui';
import Landing from 'components/Landing';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchHomePageStats, resetFeedback, sendContact } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectHomePage } from './selectors';
import { HomePageContainer } from './styledComponents';

const HomePage = ({
  dispatchFetchHomePageStats,
  dispatchResetFeedback,
  dispatchSendContact,
  error,
  handleNav,
  isSignedIn,
  loading,
  stats,
  success,
}) => {
  useEffect(() => {
    dispatchFetchHomePageStats();
    document.title = 'Rysolv';
  }, []);

  const HomePageComponent = (
    <HomePageContainer>
      <Landing
        dispatchResetFeedback={dispatchResetFeedback}
        dispatchSendContact={dispatchSendContact}
        error={error}
        handleNav={handleNav}
        loading={loading}
        stats={stats}
        success={success}
      />
    </HomePageContainer>
  );

  return (
    <ConditionalRender
      Component={HomePageComponent}
      FallbackComponent={<Redirect to="/issues" />}
      shouldRender={!isSignedIn}
    />
  );
};

HomePage.propTypes = {
  dispatchFetchHomePageStats: T.func.isRequired,
  dispatchResetFeedback: T.func.isRequired,
  dispatchSendContact: T.func.isRequired,
  error: T.bool.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  loading: T.bool.isRequired,
  stats: T.object.isRequired,
  success: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  isSignedIn: makeSelectAuth('isSignedIn'),
  /*
   * Reducer : HomePage
   */
  error: makeSelectHomePage('error'),
  loading: makeSelectHomePage('loading'),
  stats: makeSelectHomePage('stats'),
  success: makeSelectHomePage('success'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : HomePage
   */
  dispatchFetchHomePageStats: () => dispatch(fetchHomePageStats()),
  dispatchResetFeedback: () => dispatch(resetFeedback()),
  dispatchSendContact: payload => dispatch(sendContact(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(HomePage),
);
