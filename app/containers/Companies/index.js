import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { incrementStep } from './actions';
import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCompanies } from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
  render() {
    const { data, handleNav, handleIncrementStep, step, view } = this.props;
    const Component = companyTypeDictionary[view][step];
    return (
      <Fragment>
        <Component
          data={data}
          handleNav={handleNav}
          handleIncrementStep={handleIncrementStep}
        />
      </Fragment>
    );
  }
}

Companies.defaultProps = { view: 'overview' };

Companies.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleNav: T.func,
  step: T.number,
  view: T.string,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
  step: makeSelectCompanies('step'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    /**
     * Reducer : Router
     */
    handleNav: ({ subroute, view }) => {
      const viewUrl = view ? `/${view}` : '';
      dispatch(push(`/admin/${subroute}${viewUrl}`));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companies', reducer });
const withSaga = injectSaga({ key: 'companies', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Companies);
