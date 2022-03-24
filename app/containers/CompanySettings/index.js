import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import {
  CompanyContract,
  CompanyContractConfirmation,
} from 'components/CompanyContractModal';
import {
  CompanyPayment,
  CompanyPaymentConfirmation,
} from 'components/CompanyPaymentModal';
import CompanySettingsSideNav from 'components/CompanySettings/SideNav';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  clearAlerts,
  closeModalState,
  editUser,
  fetchContract,
  fetchPlaidToken,
  fetchUser,
  inputError,
  openModalState,
  resetModalState,
  setModalAlerts,
  submitContractAccepted,
  updatePaymentMethod,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanySettings,
  makeSelectCompanySettingsLoading,
  makeSelectCompanySettingsView,
} from './selectors';
import { VerticalDivider, ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CompanySettings = ({
  activeUser,
  companyUser,
  contract,
  dispatchChangeInput,
  dispatchClearAlerts,
  dispatchCloseModal,
  dispatchEditUser,
  dispatchFetchContract,
  dispatchFetchPlaidToken,
  dispatchFetchUser,
  dispatchInputError,
  dispatchOpenModal,
  dispatchResetModalState,
  dispatchSetModalAlerts,
  dispatchSubmitContractAccepted,
  dispatchUpdatePaymentMethod,
  error,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  loading,
  modal,
  modalAlerts,
  modalLoading,
  plaidToken,
  view,
}) => {
  const { id, company } = activeUser;
  const {
    companyId,
    contract: currentPlan,
    paymentConfirmed,
    paymentMethod,
  } = company;

  useEffect(() => {
    if (id) dispatchFetchUser({ userId: id });
  }, []);

  const ComponentToRender = viewDictionary[view];

  const handleEditUser = ({ field, value }) => {
    const validationError = validateOneField({ field, values: form }) || '';
    if (!validationError) {
      dispatchEditUser({ field, value });
    } else {
      dispatchInputError({
        errors: {
          [field]: validationError,
        },
      });
    }
  };

  const handleSelectPlan = ({ plan }) => {
    dispatchFetchContract({ plan });
    dispatchOpenModal({ modalState: 'contract' });
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
    });
  };

  const modalPropsDictionary = {
    contract: {
      Component: CompanyContract,
      open: isModalOpen,
      propsToPassDown: {
        alerts: { error },
        companyId,
        contract,
        dispatchChangeInput,
        dispatchResetModalState,
        dispatchSubmitContractAccepted,
        handleClose: dispatchCloseModal,
        paymentConfirmed,
      },
    },
    contractConfirmation: {
      Component: CompanyContractConfirmation,
      open: isModalOpen,
      propsToPassDown: {
        contract,
        handleClose: dispatchCloseModal,
      },
    },
    payment: {
      Component: CompanyPayment,
      open: isModalOpen,
      propsToPassDown: {
        dispatchClearAlerts,
        dispatchFetchPlaidToken,
        dispatchResetModalState,
        dispatchSetModalAlerts,
        dispatchUpdatePaymentMethod,
        handleClose: dispatchCloseModal,
        modalAlerts,
        modalLoading,
        paymentConfirmed,
        plaidToken,
      },
    },
    paymentConfirmation: {
      Component: CompanyPaymentConfirmation,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
      },
    },
  };

  return (
    <ViewContainer>
      <CompanySettingsSideNav selected={view} />
      <VerticalDivider />
      <AsyncRender
        asyncData={companyUser}
        component={ComponentToRender}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          currentPlan,
          dispatchChangeInput,
          dispatchFetchUser,
          dispatchOpenModal,
          form,
          formErrors,
          handleEditUser,
          handleNav,
          handleSelectPlan,
          handleValidateInput,
          paymentConfirmed,
          paymentMethod,
        }}
      />
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </ViewContainer>
  );
};

CompanySettings.propTypes = {
  activeUser: T.object.isRequired,
  companyUser: T.object.isRequired,
  contract: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchEditUser: T.func.isRequired,
  dispatchFetchContract: T.func.isRequired,
  dispatchFetchPlaidToken: T.func.isRequired,
  dispatchFetchUser: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetModalState: T.func.isRequired,
  dispatchSetModalAlerts: T.func.isRequired,
  dispatchSubmitContractAccepted: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  modal: T.string.isRequired,
  modalAlerts: T.object.isRequired,
  modalLoading: T.bool.isRequired,
  plaidToken: T.string,
  view: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : CompanySettings
   */
  companyUser: makeSelectCompanySettings('companyUser'),
  contract: makeSelectCompanySettings('contract'),
  error: makeSelectCompanySettings('error'),
  form: makeSelectCompanySettings('form'),
  formErrors: makeSelectCompanySettings('formErrors'),
  isModalOpen: makeSelectCompanySettings('isModalOpen'),
  loading: makeSelectCompanySettingsLoading('fetchUser'),
  modal: makeSelectCompanySettings('modal'),
  modalAlerts: makeSelectCompanySettings('modalAlerts'),
  modalLoading: makeSelectCompanySettingsLoading('modal'),
  plaidToken: makeSelectCompanySettings('plaidToken'),
  view: makeSelectCompanySettingsView(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanySettings
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchEditUser: payload => dispatch(editUser(payload)),
  dispatchFetchContract: payload => dispatch(fetchContract(payload)),
  dispatchFetchPlaidToken: payload => dispatch(fetchPlaidToken(payload)),
  dispatchFetchUser: payload => dispatch(fetchUser(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchResetModalState: () => dispatch(resetModalState()),
  dispatchSetModalAlerts: payload => dispatch(setModalAlerts(payload)),
  dispatchSubmitContractAccepted: payload =>
    dispatch(submitContractAccepted(payload)),
  dispatchUpdatePaymentMethod: payload =>
    dispatch(updatePaymentMethod(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companySettings', reducer });
const withSaga = injectSaga({ key: 'companySettings', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanySettings),
);
