import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { clearForm } from './actions';
import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
  componentDidMount() {
    const { dispatchClearForm } = this.props;
    document.title = 'Admin: Companies';
    dispatchClearForm();
  }

  render() {
    const { match, view } = this.props;
    const Component = companyTypeDictionary[view];
    return (
      <Fragment>
        <Component match={match} />
      </Fragment>
    );
  }
}

Companies.defaultProps = { view: 'overview' };

Companies.propTypes = {
  dispatchClearForm: T.func,
  handleNav: T.func,
  match: T.object,
  view: T.string,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Companies
     */
    dispatchClearForm: () => dispatch(clearForm()),
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
