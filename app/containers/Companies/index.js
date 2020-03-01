import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Companies extends React.PureComponent {
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
  view: T.string,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Companies
   */
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Router
     */
    handleNav: ({ subroute, view }) => {
      const viewUrl = view ? `/${view}` : '';
      dispatch(push(`/${subroute}${viewUrl}`));
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
