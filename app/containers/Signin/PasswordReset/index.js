import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';

import { resetState } from '../actions';
import reducer from '../reducer';
import { makeSelectSignIn } from '../selectors';
import { passwordResetDictionary } from './stepDictionary';

const PasswordResetContainer = ({ dispatchResetState, resetStep }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Password Reset';
    return () => dispatchResetState();
  }, []);

  const ViewToRender = passwordResetDictionary[resetStep];

  return <ViewToRender />;
};

PasswordResetContainer.propTypes = {
  dispatchResetState: T.func.isRequired,
  resetStep: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : Signin
   */
  resetStep: makeSelectSignIn('resetStep'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Signin
     */
    dispatchResetState: () => dispatch(resetState()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signin', reducer });

export default compose(
  withReducer,
  withConnect,
)(PasswordResetContainer);
