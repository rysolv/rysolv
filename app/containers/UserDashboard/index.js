import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import UpdateLinksModal from 'components/UpdateLinksModal';
import UpdateSkillsModal from 'components/UpdateSkillsModal';
import makeSelectViewSize from 'containers/ViewSize/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeSkillLevel,
  clearAlerts,
  closeModalState,
  deleteSkill,
  fetchQuestions,
  fetchUserDashboard,
  fetchUserResponse,
  inputError,
  openModalState,
  resetFormState,
  setHiringStatus,
  updateUser,
  updateUserResponses,
} from './actions';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectUserDashboard,
  makeSelectUserDashboardLoading,
  makeSelectUserDashboardQuestions,
  makeSelectUserDashboardResponseArray,
  makeSelectUserDashboardView,
} from './selectors';
import { ViewContainer } from './styledComponents';
import viewDictionary from './viewDictionary';

const UserDashboard = ({
  alerts,
  deviceView,
  dispatchChangeInput,
  dispatchChangeSkillLevel,
  dispatchClearAlerts,
  dispatchCloseModal,
  dispatchDeleteSkill,
  dispatchFetchQuestions,
  dispatchFetchUserDashboard,
  dispatchFetchUserResponse,
  dispatchInputError,
  dispatchOpenModal,
  dispatchResetFormState,
  dispatchSetHiringStatus,
  dispatchUpdateUser,
  dispatchUpdateUserResponses,
  error,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  isOverview,
  loading,
  modal,
  questions,
  responseArray,
  skills,
  user,
  view,
}) => {
  const { application: applicationForm, profile: profileForm } = form;
  const {
    application: applicationFormErrors,
    profile: profileFormErrors,
  } = formErrors;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Dashboard';
    dispatchFetchQuestions({ category: 'hiring' });
    dispatchFetchUserDashboard();
  }, []);

  const ComponentToRender = viewDictionary(view);

  const handleUpdateFiles = async filesArray => {
    dispatchChangeInput({ field: 'resume', value: filesArray });
  };

  const handleUpdateUser = () => {
    const { isValidated, validationErrors } = validateFields({
      values: profileForm,
    });
    if (isValidated) {
      dispatchUpdateUser({ ...profileForm });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'profile' });
    }
  };

  const handleUpdateUserResponses = () => {
    const field = 'skills';
    const validationError =
      validateOneField({ field, values: applicationForm }) || '';
    if (!validationError) {
      dispatchUpdateUserResponses({ responseArray });
    } else {
      dispatchInputError({
        errors: { [field]: validationError },
        form: 'application',
      });
    }
  };

  const handleValidateInput = ({ field, formType, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: formType,
    });
  };

  const skillsQuestion = questions.find(({ id }) => id === 'skills');

  const modalPropsDictionary = {
    updateLinks: {
      Component: UpdateLinksModal,
      open: isModalOpen,
      propsToPassDown: {
        alerts,
        dispatchChangeInput,
        dispatchClearAlerts,
        dispatchResetFormState,
        form: profileForm,
        formErrors: profileFormErrors,
        handleClose: dispatchCloseModal,
        handleUpdateUser,
        handleValidateInput,
        skills,
        user,
        ...skillsQuestion,
      },
    },
    updateSkills: {
      Component: UpdateSkillsModal,
      open: isModalOpen,
      propsToPassDown: {
        alerts,
        dispatchChangeInput,
        dispatchChangeSkillLevel,
        dispatchClearAlerts,
        dispatchDeleteSkill,
        dispatchFetchUserResponse,
        dispatchResetFormState,
        form: applicationForm,
        formErrors: applicationFormErrors,
        handleClose: dispatchCloseModal,
        handleUpdateUserResponses,
        handleValidateInput,
        skills,
        user,
        ...skillsQuestion,
      },
    },
  };

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={user}
        component={ComponentToRender}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          alerts,
          deviceView,
          dispatchChangeInput,
          dispatchClearAlerts,
          dispatchFetchUserResponse,
          dispatchOpenModal,
          dispatchResetFormState,
          dispatchSetHiringStatus,
          form: applicationForm,
          formErrors: applicationFormErrors,
          handleNav,
          handleUpdateFiles,
          handleUpdateUser,
          handleValidateInput,
          isOverview,
          loading,
          questions,
          user,
        }}
      />
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </ViewContainer>
  );
};

UserDashboard.defaultProps = { isOverview: false };

UserDashboard.propTypes = {
  alerts: T.object.isRequired,
  deviceView: T.string.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeSkillLevel: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchCloseModal: T.func.isRequired,
  dispatchDeleteSkill: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchFetchUserDashboard: T.func.isRequired,
  dispatchFetchUserResponse: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  dispatchUpdateUser: T.func.isRequired,
  dispatchUpdateUserResponses: T.func.isRequired,
  error: T.oneOfType([T.bool, T.object]),
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  isOverview: T.bool,
  loading: T.bool.isRequired,
  modal: T.string.isRequired,
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
  skills: T.array.isRequired,
  user: T.object.isRequired,
  view: T.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : User Dashboard
   */
  alerts: makeSelectUserDashboard('alerts'),
  error: makeSelectUserDashboard('error'),
  form: makeSelectUserDashboard('form'),
  formErrors: makeSelectUserDashboard('formErrors'),
  isModalOpen: makeSelectUserDashboard('isModalOpen'),
  loading: makeSelectUserDashboardLoading('fetchUserDashboard'),
  modal: makeSelectUserDashboard('modal'),
  questions: makeSelectUserDashboardQuestions(),
  responseArray: makeSelectUserDashboardResponseArray(),
  skills: makeSelectUserDashboard('skills'),
  user: makeSelectUserDashboard('user'),
  view: makeSelectUserDashboardView(),
  /**
   * Reducer : ViewSize
   */
  deviceView: makeSelectViewSize('deviceView'),
});

function mapDispatchToProps(dispatch) {
  return {
    /*
     * Reducer : User Dashboard
     */
    dispatchChangeInput: payload => dispatch(changeInput(payload)),
    dispatchChangeSkillLevel: payload => dispatch(changeSkillLevel(payload)),
    dispatchClearAlerts: () => dispatch(clearAlerts()),
    dispatchCloseModal: () => dispatch(closeModalState()),
    dispatchDeleteSkill: payload => dispatch(deleteSkill(payload)),
    dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
    dispatchFetchUserDashboard: () => dispatch(fetchUserDashboard()),
    dispatchFetchUserResponse: () => dispatch(fetchUserResponse()),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    dispatchResetFormState: () => dispatch(resetFormState()),
    dispatchSetHiringStatus: payload => dispatch(setHiringStatus(payload)),
    dispatchUpdateUser: payload => dispatch(updateUser(payload)),
    dispatchUpdateUserResponses: payload =>
      dispatch(updateUserResponses(payload)),
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

const withReducer = injectReducer({ key: 'userDashboard', reducer });
const withSaga = injectSaga({ key: 'userDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserDashboard);
