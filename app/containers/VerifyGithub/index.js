import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncLoad from 'components/AsyncLoad';
import { githubSignIn } from 'containers/Auth/actions';
import { verifyAccount } from 'containers/Settings/actions';
import reducer from 'containers/Settings/reducer';
import saga from 'containers/Settings/saga';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

const VerifyGithub = ({ dispatchGithubSignIn, dispatchVerifyAccount }) => {
  useEffect(() => {
    const { href, pathname } = window.location;
    const code = href.split('?code=')[1];
    const origin = pathname.split('/')[1];
    if (origin === 'account') {
      dispatchVerifyAccount({ code });
    }
    if (origin === 'apply' || origin === 'signin' || origin === 'signup') {
      dispatchGithubSignIn({ code, origin });
    }
  }, []);
  return <AsyncLoad />;
};

VerifyGithub.propTypes = {
  dispatchGithubSignIn: T.func.isRequired,
  dispatchVerifyAccount: T.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Auth
     */
    dispatchGithubSignIn: payload => dispatch(githubSignIn(payload)),
    /**
     * Reducer : Settings
     */
    dispatchVerifyAccount: payload => dispatch(verifyAccount(payload)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VerifyGithub);
