import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CompanyRecruitmentView from 'components/CompanyRecruitment';

import { Wrapper } from './styledComponents';

const CompanyRecruitment = () => (
  <Wrapper>
    <CompanyRecruitmentView />
  </Wrapper>
);

CompanyRecruitment.propTypes = {};

const withConnect = connect(
  null,
  null,
);

export default compose(withConnect)(CompanyRecruitment);
