import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CompanyRecruitmentView from 'components/CompanyRecruitment';

import { ViewContainer } from './styledComponents';

const CompanyRecruitment = () => (
  <ViewContainer>
    <CompanyRecruitmentView />
  </ViewContainer>
);

CompanyRecruitment.propTypes = {};

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(CompanyRecruitment);
