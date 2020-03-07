import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { incrementStep, inputChange } from './actions';
import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCompanies } from './selectors';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
  render() {
    const {
      data,
      handleIncrementStep,
      handleInputChange,
      handleNav,
      view,
    } = this.props;
    console.log('view', view);
    const Component = companyTypeDictionary[view];
    return (
      <Fragment>
        <Component
          data={data}
          handleIncrementStep={handleIncrementStep}
          handleInputChange={handleInputChange}
          handleNav={handleNav}
        />
      </Fragment>
    );
  }
}

Companies.defaultProps = { view: 'overview' };

Companies.propTypes = {
  data: T.object,
  handleIncrementStep: T.func,
  handleInputChange: T.func,
  handleNav: T.func,
  view: T.string,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
  data: makeSelectCompanies('data'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Companies
     */
    handleIncrementStep: payload => dispatch(incrementStep(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
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
