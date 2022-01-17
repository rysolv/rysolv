import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectSignIn } from '../selectors';
import { passwordResetDictionary } from './stepDictionary';

const PasswordResetContainer = ({ resetStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Password Reset';
  }, []);

  const ViewToRender = passwordResetDictionary[resetStep];

  return <ViewToRender />;
};

PasswordResetContainer.propTypes = { resetStep: T.number.isRequired };

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Signin
   */
  resetStep: makeSelectSignIn('resetStep'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(PasswordResetContainer);
