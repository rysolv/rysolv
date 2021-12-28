import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import ContractConfirmationModal from 'components/CompanyContractModal/confirmationView';
import PaymentConfirmationModal from 'components/CompanyPaymentModal/confirmationView';
import CompanyContractModal from 'components/CompanyContractModal';
import CompanyPaymentModal from 'components/CompanyPaymentModal';
import CompanySettingsSideNav from 'components/CompanySettings/SideNav';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  closeModalState,
  editUser,
  fetchContract,
  fetchPlaidToken,
  fetchUser,
  inputError,
  openModalState,
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
  dispatchCloseModal,
  dispatchEditUser,
  dispatchFetchContract,
  dispatchFetchPlaidToken,
  dispatchFetchUser,
  dispatchInputError,
  dispatchOpenModal,
  dispatchSubmitContractAccepted,
  dispatchUpdatePaymentMethod,
  error,
  form,
  formErrors,
  isModalOpen,
  loading,
  modal,
  plaidToken,
  view,
}) => {
  const { id, company } = activeUser;
  const { companyId, contract: currentPlan, paymentConfirmed } = company;

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
      Component: CompanyContractModal,
      open: isModalOpen,
      propsToPassDown: {
        alerts: { error },
        companyId,
        contract,
        dispatchChangeInput,
        dispatchSubmitContractAccepted,
        handleClose: dispatchCloseModal,
        paymentConfirmed,
      },
    },
    payment: {
      Component: CompanyPaymentModal,
      open: isModalOpen,
      propsToPassDown: {
        dispatchFetchPlaidToken,
        dispatchUpdatePaymentMethod,
        handleClose: dispatchCloseModal,
        paymentConfirmed,
        plaidToken,
        setStripeError: () => console.log('STRIPE ERROR. THIS IS TEMPORARY'),
        setPlaidError: () => console.log('PLAID ERROR. THIS IS TEMPORARY'),
      },
    },
    contractConfirmation: {
      Component: ContractConfirmationModal,
      open: isModalOpen,
      propsToPassDown: {
        contract,
        handleClose: dispatchCloseModal,
      },
    },
    paymentConfirmation: {
      Component: PaymentConfirmationModal,
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
          handleSelectPlan,
          handleValidateInput,
          paymentConfirmed,
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
  dispatchCloseModal: T.func.isRequired,
  dispatchEditUser: T.func.isRequired,
  dispatchFetchContract: T.func.isRequired,
  dispatchFetchPlaidToken: T.func.isRequired,
  dispatchFetchUser: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchSubmitContractAccepted: T.func.isRequired,
  dispatchUpdatePaymentMethod: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]),
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  modal: T.string.isRequired,
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
  plaidToken: makeSelectCompanySettings('plaidToken'),
  error: makeSelectCompanySettings('error'),
  form: makeSelectCompanySettings('form'),
  formErrors: makeSelectCompanySettings('formErrors'),
  isModalOpen: makeSelectCompanySettings('isModalOpen'),
  loading: makeSelectCompanySettingsLoading('fetchUser'),
  modal: makeSelectCompanySettings('modal'),
  view: makeSelectCompanySettingsView(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanySettings
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchEditUser: payload => dispatch(editUser(payload)),
  dispatchFetchContract: payload => dispatch(fetchContract(payload)),
  dispatchFetchPlaidToken: payload => dispatch(fetchPlaidToken(payload)),
  dispatchFetchUser: payload => dispatch(fetchUser(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  dispatchSubmitContractAccepted: payload =>
    dispatch(submitContractAccepted(payload)),
  dispatchUpdatePaymentMethod: payload =>
    dispatch(updatePaymentMethod(payload)),
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
