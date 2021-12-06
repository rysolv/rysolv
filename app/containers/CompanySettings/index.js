import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import CompanySettingsSideNav from 'components/CompanySettingsSideNav';
import DeleteUserModal from 'components/DeleteUserModal';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  closeModalState,
  deleteUser,
  editUser,
  fetchUser,
  inputError,
  openModalState,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanySettings,
  makeSelectCompanySettingsView,
} from './selectors';
import { VerticalDivider, ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const CompanySettings = ({
  activeUser,
  companyUser,
  dispatchChangeInput,
  dispatchCloseModal,
  dispatchDeleteUser,
  dispatchEditUser,
  dispatchFetchUser,
  dispatchInputError,
  dispatchOpenModal,
  error,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  loading,
  modal,
  view,
}) => {
  const { id } = activeUser;

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

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
    });
  };

  const modalPropsDictionary = {
    deleteUser: {
      Component: DeleteUserModal,
      open: isModalOpen,
      propsToPassDown: {
        handleDeleteUser: dispatchDeleteUser,
        handleClose: dispatchCloseModal,
      },
    },
  };

  return (
    <ViewContainer>
      <CompanySettingsSideNav handleNav={handleNav} />
      <VerticalDivider />
      <AsyncRender
        asyncData={companyUser}
        component={ComponentToRender}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          dispatchChangeInput,
          dispatchOpenModal,
          dispatchFetchUser,
          form,
          formErrors,
          handleEditUser,
          handleValidateInput,
        }}
      />
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </ViewContainer>
  );
};

CompanySettings.propTypes = {
  activeUser: T.object.isRequired,
  companyUser: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchDeleteUser: T.func.isRequired,
  dispatchEditUser: T.func.isRequired,
  dispatchFetchUser: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  error: T.oneOfType([T.bool, T.string]).isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  modal: T.string.isRequired,
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
  error: makeSelectCompanySettings('error'),
  form: makeSelectCompanySettings('form'),
  formErrors: makeSelectCompanySettings('formErrors'),
  isModalOpen: makeSelectCompanySettings('isModalOpen'),
  loading: makeSelectCompanySettings('loading'),
  modal: makeSelectCompanySettings('modal'),
  view: makeSelectCompanySettingsView(),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanySettings
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchCloseModal: () => dispatch(closeModalState()),
  dispatchDeleteUser: () => dispatch(deleteUser()),
  dispatchEditUser: payload => dispatch(editUser(payload)),
  dispatchFetchUser: payload => dispatch(fetchUser(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchOpenModal: payload => dispatch(openModalState(payload)),
  /**
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
