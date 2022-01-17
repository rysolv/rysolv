import React from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import reducer from './reducer';
import saga from './saga';
import { makeSelectUserDashboardView } from './selectors';
import { ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const UserDashboard = ({ view }) => {
  const ComponentToRender = viewDictionary(view);

  return (
    <ViewContainer>
      <ComponentToRender />
    </ViewContainer>
  );
};

UserDashboard.propTypes = { view: T.string.isRequired };

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : UserDashboard
   */
  view: makeSelectUserDashboardView(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
