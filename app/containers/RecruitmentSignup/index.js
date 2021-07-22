import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import RecruitmentSignupView from 'components/RecruitmentSignupp';

const RecruitmentSignup = () => <RecruitmentSignupView />;

RecruitmentSignup.propTypes = {};

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(RecruitmentSignup);
