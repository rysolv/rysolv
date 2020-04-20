import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { userTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Users extends React.PureComponent {
  componentDidMount() {
    document.title = 'Admin: Users';
  }

  render() {
    const { match, view } = this.props;
    const Component = userTypeDictionary[view];
    return (
      <Fragment>
        <Component match={match} />
      </Fragment>
    );
  }
}

Users.defaultProps = { view: 'overview' };

Users.propTypes = {
  match: T.object,
  view: T.string,
};

const withConnect = connect(
  null,
  null,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Users);
