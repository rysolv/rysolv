import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
  componentDidMount() {
    const { handleNav } = this.props;
    document.title = 'Admin: Companies';
    handleNav('/admin/companies');
  }

  render() {
    const { view } = this.props;
    const Component = companyTypeDictionary[view];
    return (
      <Fragment>
        <Component />
      </Fragment>
    );
  }
}

Companies.defaultProps = { view: 'overview' };

Companies.propTypes = {
  handleNav: T.func,
  view: T.string,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'companies', reducer });

const withSaga = injectSaga({ key: 'companies', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Companies);
