import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import CompanyPositionDetailView from 'components/CompanyPositionDetail';
import { getParameterByName } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { fetchPositionDetail } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanyPositionDetail,
  makeSelectCompanyPositionDetailLoading,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyPositionDetail = ({
  company,
  dispatchFetchPositionDetail,
  error,
  fetchCompanyLoading,
  fetchPositionDetailLoading,
  position,
}) => {
  const positionId = getParameterByName('id');
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Position Detail';
    dispatchFetchPositionDetail({ positionId });
  }, []);

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={position}
        component={CompanyPositionDetailView}
        error={error}
        isRequiredData
        loading={fetchCompanyLoading || fetchPositionDetailLoading}
        propsToPassDown={{ company, position }}
      />
    </ViewContainer>
  );
};

CompanyPositionDetail.propTypes = {
  company: T.object.isRequired,
  dispatchFetchPositionDetail: T.func.isRequired,
  error: T.bool.isRequired,
  fetchCompanyLoading: T.bool.isRequired,
  fetchPositionDetailLoading: T.bool.isRequired,
  position: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyPositionDetail
   */
  company: makeSelectCompanyPositionDetail('company'),
  error: makeSelectCompanyPositionDetail('error'),
  fetchCompanyLoading: makeSelectCompanyPositionDetailLoading('fetchCompany'),
  fetchPositionDetailLoading: makeSelectCompanyPositionDetailLoading(
    'fetchPositionDetail',
  ),
  position: makeSelectCompanyPositionDetail('position'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyPositionDetail
   */
  dispatchFetchPositionDetail: payload =>
    dispatch(fetchPositionDetail(payload)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companyPositionDetail', reducer });
const withSaga = injectSaga({ key: 'companyPositionDetail', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanyPositionDetail),
);
