import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSignIn } from '../selectors';
import { signUpDictionary } from '../stepDictionary';

const SignUpContainer = ({ step }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Sign Up';
  }, []);

  const ViewToRender = signUpDictionary[step];

  return <ViewToRender />;
};

SignUpContainer.propTypes = { step: T.number.isRequired };

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Signin
   */
  step: makeSelectSignIn('step'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(SignUpContainer);
