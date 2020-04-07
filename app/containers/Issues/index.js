import React, { Fragment } from 'react';
import T from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { push } from 'connected-react-router';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { issueTypeDictionary } from './helpers';
import reducer from './reducer';
import saga from './saga';

// eslint-disable-next-line react/prefer-stateless-function
export class Issues extends React.PureComponent {
  componentDidMount() {
    document.title = 'Admin: Issues';
    const { handleNav } = this.props;
    handleNav('/admin/issues');
  }

  render() {
    const { view } = this.props;
    const Component = issueTypeDictionary[view];
    return (
      <Fragment>
        <Component />
      </Fragment>
    );
  }
}

Issues.defaultProps = { view: 'overview' };

Issues.propTypes = {
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

const withReducer = injectReducer({ key: 'issues', reducer });
const withSaga = injectSaga({ key: 'issues', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Issues);
