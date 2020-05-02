import { useEffect } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { fetchActiveUser } from './actions';
import saga from './saga';
import reducer from './reducer';

export const Auth = ({ children, dispatchFetchActiveUser }) => {
  useEffect(() => {
    const userArray = [
      '517fa5c9-1d6e-4925-8bcc-25c24cd0b95d',
      'b519b064-b5db-4472-ad1b-00e30bdbfa4c',
      'c2209ded-9219-4ee3-9c29-f863889053c0',
      'cdd583cf-4711-4f33-a202-c937081afd7e',
      '3f6e3ddf-ab68-4ee3-bb79-abfe21c8d014',
    ];
    const rand = Math.floor(Math.random() * Math.floor(5));
    dispatchFetchActiveUser({ userId: userArray[rand] });
  }, []);

  return children;
};

Auth.propTypes = {
  dispatchFetchActiveUser: T.func,
  children: T.node.isRequired,
};

const mapDispatchToProps = dispatch => ({
  handleNav: ({ subroute }) => {
    dispatch(push(`/${subroute}`));
  },
  dispatchFetchActiveUser: payload => dispatch(fetchActiveUser(payload)),
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Auth);
