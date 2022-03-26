import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import ApplyJobModal from 'components/ApplyJobModal';
import CompleteApplicationModal from 'components/CompleteApplicationModal';
import SigninModal from 'components/SigninModal';
import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import CompanyPositionDetailView from 'components/CompanyPositionDetail';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  clearAlerts,
  closeModalState,
  fetchPositionDetail,
  inputError,
  notifyCompany,
  openModalState,
  resetFormState,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanyPositionDetail,
  makeSelectCompanyPositionDetailId,
  makeSelectCompanyPositionDetailLoading,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyPositionDetail = ({
  activeUser,
  company,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchCloseModal,
  dispatchFetchPositionDetail,
  dispatchInputError,
  dispatchNotifyCompany,
  dispatchOpenModal,
  dispatchResetFormState,
  error,
  fetchCompanyLoading,
  fetchPositionDetailLoading,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  isSignedIn,
  messageAlerts,
  modal,
  notifyCompanyLoading,
  position,
  positionId,
}) => {
  const { firstName, lastName, surveyComplete } = activeUser;
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Position Detail';
    dispatchFetchPositionDetail({ positionId });
  }, []);

  const isCompany = !!activeUser.company;

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
    });
  };

  const modalPropsDictionary = {
    apply: {
      Component: ApplyJobModal,
      open: isModalOpen,
      propsToPassDown: {
        dispatchChangeInput,
        dispatchClearAlerts,
        dispatchNotifyCompany,
        dispatchResetFormState,
        form,
        formErrors,
        handleClose: dispatchCloseModal,
        handleValidateInput,
        hasFirstName: !!firstName,
        hasLastName: !!lastName,
        messageAlerts,
        notifyCompanyLoading,
        positionId,
      },
    },
    incomplete: {
      Component: CompleteApplicationModal,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
        handleNav,
      },
    },
    signin: {
      Component: SigninModal,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
        handleRedirect: handleNav,
      },
    },
  };

  return (
    <Fragment>
      <ViewContainer>
        <AsyncRender
          asyncData={position}
          component={CompanyPositionDetailView}
          error={error}
          isRequiredData
          loading={fetchCompanyLoading || fetchPositionDetailLoading}
          propsToPassDown={{
            company,
            dispatchOpenModal,
            isCompany,
            isSignedIn,
            position,
            surveyComplete,
          }}
        />
      </ViewContainer>
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </Fragment>
  );
};

CompanyPositionDetail.propTypes = {
  activeUser: T.object.isRequired,
  company: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchFetchPositionDetail: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchNotifyCompany: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  error: T.bool.isRequired,
  fetchCompanyLoading: T.bool.isRequired,
  fetchPositionDetailLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  isSignedIn: T.bool.isRequired,
  messageAlerts: T.object.isRequired,
  modal: T.string.isRequired,
  notifyCompanyLoading: T.bool.isRequired,
  position: T.object.isRequired,
  positionId: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer: Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  isSignedIn: makeSelectAuth('isSignedIn'),
  /*
   * Reducer : CompanyPositionDetail
   */
  company: makeSelectCompanyPositionDetail('company'),
  error: makeSelectCompanyPositionDetail('error'),
  fetchCompanyLoading: makeSelectCompanyPositionDetailLoading('fetchCompany'),
  fetchPositionDetailLoading: makeSelectCompanyPositionDetailLoading(
    'fetchPositionDetail',
  ),
  form: makeSelectCompanyPositionDetail('form'),
  formErrors: makeSelectCompanyPositionDetail('formErrors'),
  isModalOpen: makeSelectCompanyPositionDetail('isModalOpen'),
  messageAlerts: makeSelectCompanyPositionDetail('messageAlerts'),
  modal: makeSelectCompanyPositionDetail('modal'),
  notifyCompanyLoading: makeSelectCompanyPositionDetailLoading('notifyCompany'),
  position: makeSelectCompanyPositionDetail('position'),
  positionId: makeSelectCompanyPositionDetailId(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyPositionDetail
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchFetchPositionDetail: payload =>
    dispatch(fetchPositionDetail(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchNotifyCompany: payload => dispatch(notifyCompany(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchResetFormState: () => dispatch(resetFormState()),
  /**
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
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
