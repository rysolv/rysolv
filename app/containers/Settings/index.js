import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import DeleteUserModal from 'components/DeleteUserModal';
import SettingsView from 'components/Settings';
import { makeSelectAuth } from 'containers/Auth/selectors';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import PullRequestOverview from 'containers/PullRequests/Overview';
import { handleZipChange } from 'utils/globalHelpers';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  changeEmail,
  clearAlerts,
  clearErrors,
  closeModalState,
  deleteUser,
  fetchInfo,
  inputChange,
  inputError,
  openModalState,
  paypalPayment,
  removeIssue,
  removeWatching,
  saveChange,
  stripeToken,
  verifyAccount,
  withdrawFunds,
} from './actions';
import { settingViewDictionary } from './constants';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectSettings, makeSelectSettingsDetail } from './selectors';
import { SettingsWrapper } from './styledComponents';

const Settings = ({
  activeUser: { id: userId },
  alerts,
  data,
  data: { isGithubVerified },
  deviceView,
  dispatchCloseModal,
  dispatchFetchInfo,
  dispatchInputError,
  dispatchOpenModal,
  dispatchPaypalPayment,
  dispatchSaveChange,
  dispatchStripeToken,
  dispatchVerifyAccount,
  dispatchWithdrawFunds,
  error,
  filterValues,
  handleChangeEmail,
  handleClearAlerts,
  handleClearErrors,
  handleDeleteUser,
  handleInputChange,
  handleNav,
  handleRemoveIssue,
  handleRemoveWatching,
  inputErrors,
  isModalOpen,
  loading,
  match,
  modal,
}) => {
  const [zipValue, setZipValue] = useState('');

  useEffect(() => {
    const url = window.location.href;
    const hasCode = url.includes('?code=');
    if (
      hasCode &&
      isGithubVerified !== undefined &&
      !isGithubVerified &&
      userId
    ) {
      const newUrl = url.split('?code=');
      dispatchVerifyAccount({ code: newUrl[1], userId });
    }
  }, [isGithubVerified, userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'User Settings';
    if (userId) dispatchFetchInfo({ userId });
  }, [userId]);

  const handleStripeToken = ({ amount, token, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchStripeToken({
        amount,
        token,
        userId,
      });
    } else {
      dispatchInputError({ errors: validationErrors });
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

  const handleWithdrawFunds = ({ id, transferValue, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchWithdrawFunds({ transferValue, userId: id });
    } else {
      dispatchInputError({ errors: validationErrors });
    }
  };
  const {
    params: { view },
  } = match;
  const creditCardProps = {
    handleStripeToken,
    handleZipChange,
    setZipValue,
    zipValue,
  };
  const currentTab = settingViewDictionary[view] || 0;
  const modalPropsDictionary = {
    deleteUser: {
      Component: DeleteUserModal,
      open: isModalOpen,
      propsToPassDown: {
        handleClose: dispatchCloseModal,
        handleDeleteUser,
        userId,
      },
    },
  };
  const PullRequestComponent = () => <PullRequestOverview userId={userId} />;
  return (
    <SettingsWrapper>
      <AsyncRender
        asyncData={data}
        component={SettingsView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          alerts,
          creditCardProps,
          currentTab,
          deviceView,
          dispatchOpenModal,
          dispatchPaypalPayment,
          dispatchSaveChange,
          filterValues,
          handleChangeEmail,
          handleClearAlerts,
          handleClearErrors,
          handleInputChange,
          handleNav,
          handleRemoveIssue,
          handleRemoveWatching,
          handleValidateInput,
          handleWithdrawFunds,
          inputErrors,
          PullRequestComponent,
          view,
        }}
      />
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </SettingsWrapper>
  );
};

Settings.propTypes = {
  activeUser: T.object,
  alerts: T.object.isRequired,
  data: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchFetchInfo: T.func,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchPaypalPayment: T.func.isRequired,
  dispatchSaveChange: T.func,
  dispatchStripeToken: T.func.isRequired,
  dispatchVerifyAccount: T.func.isRequired,
  dispatchWithdrawFunds: T.func.isRequired,
  error: T.oneOfType([T.object, T.bool]).isRequired,
  filterValues: T.object,
  handleChangeEmail: T.func.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClearErrors: T.func.isRequired,
  handleDeleteUser: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveIssue: T.func.isRequired,
  handleRemoveWatching: T.func.isRequired,
  inputErrors: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  modal: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Main
   */
  activeUser: makeSelectAuth('activeUser'),
  /**
   * Reducer : Settings
   */
  alerts: makeSelectSettings('alerts'),
  data: makeSelectSettingsDetail('account'),
  error: makeSelectSettings('error'),
  filterValues: makeSelectSettings('filter'),
  inputErrors: makeSelectSettings('inputErrors'),
  isModalOpen: makeSelectSettings('isModalOpen'),
  loading: makeSelectSettings('loading'),
  modal: makeSelectSettings('modal'),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Settings
     */
    dispatchCloseModal: () => dispatch(closeModalState()),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    dispatchPaypalPayment: payload => dispatch(paypalPayment(payload)),
    dispatchSaveChange: payload => dispatch(saveChange(payload)),
    dispatchStripeToken: payload => dispatch(stripeToken(payload)),
    dispatchVerifyAccount: payload => dispatch(verifyAccount(payload)),
    dispatchWithdrawFunds: payload => dispatch(withdrawFunds(payload)),
    handleChangeEmail: payload => dispatch(changeEmail(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleClearErrors: () => dispatch(clearErrors()),
    handleDeleteUser: payload => dispatch(deleteUser(payload)),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleRemoveIssue: payload => dispatch(removeIssue(payload)),
    handleRemoveWatching: payload => dispatch(removeWatching(payload)),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Settings);
