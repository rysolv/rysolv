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

import { HomePageContainer } from './styledComponents';

const HomePage = ({ activeUser, handleNav, isSignedIn }) => {
  useEffect(() => {
    document.title = 'Rysolv';
  }, []);

  const isCompany = !!activeUser.company;
  const pathToRedirect = isCompany ? '/company/dashboard' : '/dashboard';

  const HomePageComponent = (
    <HomePageContainer>
      <Landing handleNav={handleNav} />
    </HomePageContainer>
  );

  return (
    <ConditionalRender
      Component={HomePageComponent}
      FallbackComponent={<Redirect to={pathToRedirect} />}
      shouldRender={!isSignedIn}
    />
  );
};

HomePage.propTypes = {
  activeUser: T.object.isRequired,
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(compose(withConnect)(HomePage));
