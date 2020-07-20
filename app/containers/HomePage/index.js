import React from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Splash from 'components/Splash';
import Landing from 'components/Landing';

import { HomePageContainer } from './styledComponents';

const HomePage = ({ handleNav }) => {
  document.title = 'Rysolv';
  return (
    <HomePageContainer>
      <Splash handleNav={handleNav} />
      <Landing />
    </HomePageContainer>
  );
};

HomePage.propTypes = { handleNav: T.func.isRequired };

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

export default connect(
  null,
  mapDispatchToProps,
)(HomePage);
