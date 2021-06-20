import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { Redirect } from 'react-router-dom';

import { makeSelectAuth } from 'containers/Auth/selectors';
import { ConditionalRender } from 'components/base_ui';
import Landing from 'components/Landing';

import { HomePageContainer } from './styledComponents';

const HomePage = ({ handleNav, isSignedIn }) => {
  document.title = 'Rysolv';
  const HomePageComponent = (
    <HomePageContainer>
      <Landing handleNav={handleNav} />
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
  handleNav: T.func.isRequired,
  isSignedIn: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  isSignedIn: makeSelectAuth('isSignedIn'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomePage);
