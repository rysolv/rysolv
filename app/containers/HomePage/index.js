import React, { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { ConditionalRender } from 'components/base_ui';
import Landing from 'components/Landing';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchHomePageStats, sendContact } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectHomePage } from './selectors';
import { HomePageContainer } from './styledComponents';

const HomePage = ({
  dispatchFetchHomePageStats,
  dispatchSendContact,
  handleNav,
  isSignedIn,
  stats,
}) => {
  useEffect(() => {
    dispatchFetchHomePageStats();
    document.title = 'Rysolv';
  }, []);

  const HomePageComponent = (
    <HomePageContainer>
      <Landing
        dispatchSendContact={dispatchSendContact}
        handleNav={handleNav}
        stats={stats}
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
  dispatchSendContact: T.func.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
  stats: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  isSignedIn: makeSelectAuth('isSignedIn'),
  /*
   * Reducer : HomePage
   */
  stats: makeSelectHomePage('stats'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : HomePage
   */
  dispatchFetchHomePageStats: () => dispatch(fetchHomePageStats()),
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
