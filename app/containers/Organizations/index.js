import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { clearForm } from './actions';
import { companyTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Organizations extends React.PureComponent {
  componentDidMount() {
    window.scrollTo(0, 0);
    const { dispatchClearForm } = this.props;
    document.title = 'Admin: Organizations';
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

Organizations.defaultProps = { view: 'overview' };

Organizations.propTypes = {
  dispatchClearForm: T.func,
  match: T.object,
  view: T.string,
};

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : Organizations
     */
    dispatchClearForm: () => dispatch(clearForm()),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'organizations', reducer });

const withSaga = injectSaga({ key: 'organizations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Organizations);
