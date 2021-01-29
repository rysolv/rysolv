import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import AsyncRender from 'components/AsyncRender';
import Projects from 'components/Projects';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import reducer from '../reducer';
import saga from '../saga';

const ProjectsOverview = () => (
  <AsyncRender
    // asyncData={projects}
    component={Projects}
    // error={error}
    // loading={loading}
    // propsToPassDown={{
    //   alerts,
    //   handleClearAlerts,
    //   handleNav,
    //   path,
    // }}
  />
);

ProjectsOverview.propTypes = {};

const withConnect = connect(
  null,
  null,
);

const withReducer = injectReducer({ key: 'projects', reducer });
const withSaga = injectSaga({ key: 'projects', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProjectsOverview);
