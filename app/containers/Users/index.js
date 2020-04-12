import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import PaymentPortal from 'components/Payments';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { userTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Users extends React.PureComponent {
  componentDidMount() {
    document.title = 'Admin: Users';
    const { handleNav } = this.props;
    handleNav('/admin/users');
  }

  render() {
    const { view } = this.props;
    const Component = userTypeDictionary[view];
    return (
      <Fragment>
        <Component />
        <PaymentPortal
          amountFunded="50"
          form={{
            name: { error: '', value: '' },
            email: { error: '', value: '' },
          }}
          isFunded
          handleInputChange={() => {}}
          users={[
            {
              amount: 50,
              image:
                'https://rysolv.s3.us-east-2.amazonaws.com/annaprofile.png',
              name: 'Anna Pojawis',
            },
          ]}
        />
      </Fragment>
    );
  }
}

Users.defaultProps = { view: 'overview' };

Users.propTypes = {
  handleNav: T.func,
  view: T.string,
};

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'users', reducer });
const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Users);
