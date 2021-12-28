import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { ModalDialog } from 'components/base_ui';
import AcceptBountyModal from 'components/AcceptBountyModal';
import AsyncRender from 'components/AsyncRender';
import DeleteUserModal from 'components/DeleteUserModal';
import SettingsView from 'components/Settings';
import UpdateSkillsModal from 'components/UpdateSkillsModal';
import { makeSelectAuth } from 'containers/Auth/selectors';
import PullRequestOverview from 'containers/PullRequests/Overview';
import { handleZipChange } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  acceptBounty,
  changeEmail,
  changeSkillLevel,
  clearAlerts,
  clearErrors,
  closeModalState,
  deleteSkill,
  deleteUser,
  fetchInfo,
  fetchQuestions,
  fetchUserResponse,
  inputChange,
  inputError,
  openModalState,
  paypalPayment,
  removeAttempting,
  removeWatching,
  resetFormState,
  resetState,
  saveChange,
  stripeToken,
  updateUserSkills,
  withdrawFunds,
} from './actions';
import { settingViewDictionary } from './constants';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectSettings,
  makeSelectSettingsDetail,
  makeSelectSettingsSkillsQuestion,
} from './selectors';
import { SettingsWrapper } from './styledComponents';

const Settings = ({
  activeUser: { id: userId },
  alerts,
  data,
  data: { balance },
  dispatchAcceptBounty,
  dispatchChangeSkillLevel,
  dispatchCloseModal,
  dispatchDeleteSkill,
  dispatchFetchInfo,
  dispatchFetchQuestions,
  dispatchFetchUserResponse,
  dispatchInputError,
  dispatchOpenModal,
  dispatchPaypalPayment,
  dispatchResetFormState,
  dispatchResetState,
  dispatchSaveChange,
  dispatchStripeToken,
  dispatchUpdateUserSkills,
  dispatchWithdrawFunds,
  error,
  filterValues,
  form,
  handleChangeEmail,
  handleClearAlerts,
  handleClearErrors,
  handleDeleteUser,
  handleInputChange,
  handleNav,
  handleRemoveAttempting,
  handleRemoveWatching,
  inputErrors,
  isModalOpen,
  loading,
  match,
  modal,
  skillsQuestion,
  skills,
}) => {
  const [zipValue, setZipValue] = useState('');

  useEffect(() => {
    dispatchFetchQuestions({ category: 'hiring' });
    return dispatchResetState;
  }, []);

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
      });
    } else {
      dispatchInputError({ errors: validationErrors });
    }
  };

  const handleUpdateUserSkills = () => {
    const field = 'skills';
    const validationError = validateOneField({ field, values: form }) || '';
    if (!validationError) {
      dispatchUpdateUserSkills({ ...form });
    } else {
      dispatchInputError({
        errors: { [field]: validationError },
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

  const handleWithdrawFunds = ({ email, transferValue, values }) => {
    const { isValidated, validationErrors } = validateFields({ values });
    if (isValidated) {
      dispatchWithdrawFunds({ email, transferValue });
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
    acceptBounty: {
      Component: AcceptBountyModal,
      open: isModalOpen,
      propsToPassDown: {
        bounty: data.selectedBounty,
        dispatchAcceptBounty,
        fundingId: data.fundingId,
        handleClose: dispatchCloseModal,
        repoName: data.repoName,
        username: data.username,
      },
    },
    deleteUser: {
      Component: DeleteUserModal,
      open: isModalOpen,
      propsToPassDown: {
        balance,
        handleClose: dispatchCloseModal,
        handleDeleteUser,
      },
    },
    updateSkills: {
      Component: UpdateSkillsModal,
      open: isModalOpen,
      propsToPassDown: {
        alerts,
        dispatchChangeInput: handleInputChange,
        dispatchChangeSkillLevel,
        dispatchClearAlerts: handleClearAlerts,
        dispatchDeleteSkill,
        dispatchFetchUserResponse,
        dispatchResetFormState,
        form,
        formErrors: inputErrors,
        handleClose: dispatchCloseModal,
        handleUpdateUserSkills,
        handleValidateInput,
        skills,
        user: data,
        ...skillsQuestion,
      },
    },
  };
  const PullRequestComponent = () => <PullRequestOverview />;
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
          dispatchAcceptBounty,
          dispatchOpenModal,
          dispatchPaypalPayment,
          dispatchSaveChange,
          filterValues,
          handleChangeEmail,
          handleClearAlerts,
          handleClearErrors,
          handleInputChange,
          handleNav,
          handleRemoveAttempting,
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
  dispatchAcceptBounty: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchInfo: T.func,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchFetchUserResponse: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchPaypalPayment: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSaveChange: T.func,
  dispatchStripeToken: T.func.isRequired,
  dispatchUpdateUserSkills: T.func.isRequired,
  dispatchWithdrawFunds: T.func.isRequired,
  error: T.oneOfType([T.bool, T.object]).isRequired,
  filterValues: T.object,
  form: T.object.isRequired,
  handleChangeEmail: T.func.isRequired,
  handleClearAlerts: T.func.isRequired,
  handleClearErrors: T.func.isRequired,
  handleDeleteUser: T.func.isRequired,
  handleInputChange: T.func.isRequired,
  handleNav: T.func.isRequired,
  handleRemoveAttempting: T.func.isRequired,
  handleRemoveWatching: T.func.isRequired,
  inputErrors: T.object.isRequired,
  isModalOpen: T.bool.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  modal: T.string.isRequired,
  skillsQuestion: T.object.isRequired,
  skills: T.array.isRequired,
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
  form: makeSelectSettings('form'),
  inputErrors: makeSelectSettings('inputErrors'),
  isModalOpen: makeSelectSettings('isModalOpen'),
  loading: makeSelectSettings('loading'),
  modal: makeSelectSettings('modal'),
  skillsQuestion: makeSelectSettingsSkillsQuestion(),
  skills: makeSelectSettings('skills'),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Settings
     */
    dispatchAcceptBounty: payload => dispatch(acceptBounty(payload)),
    dispatchChangeSkillLevel: payload => dispatch(changeSkillLevel(payload)),
    dispatchCloseModal: () => dispatch(closeModalState()),
    dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
    dispatchFetchInfo: payload => dispatch(fetchInfo(payload)),
    dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
    dispatchFetchUserResponse: () => dispatch(fetchUserResponse()),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    dispatchPaypalPayment: payload => dispatch(paypalPayment(payload)),
    dispatchResetFormState: () => dispatch(resetFormState()),
    dispatchResetState: () => dispatch(resetState()),
    dispatchSaveChange: payload => dispatch(saveChange(payload)),
    dispatchStripeToken: payload => dispatch(stripeToken(payload)),
    dispatchUpdateUserSkills: payload => dispatch(updateUserSkills(payload)),
    dispatchWithdrawFunds: payload => dispatch(withdrawFunds(payload)),
    handleChangeEmail: payload => dispatch(changeEmail(payload)),
    handleClearAlerts: () => dispatch(clearAlerts()),
    handleClearErrors: () => dispatch(clearErrors()),
    handleDeleteUser: () => dispatch(deleteUser()),
    handleInputChange: payload => dispatch(inputChange(payload)),
    handleRemoveAttempting: payload => dispatch(removeAttempting(payload)),
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
