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
  editUserResponse,
  fetchQuestions,
  fetchUserDashboard,
  fetchUserResponse,
  inputError,
  openModalState,
  resetFormState,
  setHiringStatus,
  updateUserLinks,
  updateUserSkills,
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
  dispatchEditUserResponse,
  dispatchFetchQuestions,
  dispatchFetchUserDashboard,
  dispatchFetchUserResponse,
  dispatchInputError,
  dispatchOpenModal,
  dispatchResetFormState,
  dispatchSetHiringStatus,
  dispatchUpdateUserLinks,
  dispatchUpdateUserSkills,
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

  const handleEditUserResponse = () => {
    const { isValidated, validationErrors } = validateFields({
      values: applicationForm,
    });
    if (isValidated) {
      dispatchEditUserResponse({ responseArray });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'application' });
    }
  };

  const handleUpdateFiles = async filesArray => {
    dispatchChangeInput({
      field: 'resume',
      form: 'application',
      value: filesArray,
    });
  };

  const handleUpdateUserLinks = () => {
    const { isValidated, validationErrors } = validateFields({
      values: profileForm,
    });
    if (isValidated) {
      dispatchUpdateUserLinks({ ...profileForm });
    } else {
      dispatchInputError({ errors: validationErrors, form: 'profile' });
    }
  };

  const handleUpdateUserSkills = () => {
    const field = 'skills';
    const validationError =
      validateOneField({ field, values: applicationForm }) || '';
    if (!validationError) {
      dispatchUpdateUserSkills({ skills: applicationForm.skills });
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
        handleUpdateUserSkills,
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
        handleUpdateUserSkills,
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
          handleEditUserResponse,
          handleNav,
          handleUpdateFiles,
          handleUpdateUserLinks,
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
  dispatchEditUserResponse: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchFetchUserDashboard: T.func.isRequired,
  dispatchFetchUserResponse: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchOpenModal: T.func.isRequired,
  dispatchResetFormState: T.func.isRequired,
  dispatchSetHiringStatus: T.func.isRequired,
  dispatchUpdateUserLinks: T.func.isRequired,
  dispatchUpdateUserSkills: T.func.isRequired,
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
    dispatchEditUserResponse: payload => dispatch(editUserResponse(payload)),
    dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
    dispatchFetchUserDashboard: () => dispatch(fetchUserDashboard()),
    dispatchFetchUserResponse: () => dispatch(fetchUserResponse()),
    dispatchInputError: payload => dispatch(inputError(payload)),
    dispatchOpenModal: payload => dispatch(openModalState(payload)),
    dispatchResetFormState: () => dispatch(resetFormState()),
    dispatchSetHiringStatus: payload => dispatch(setHiringStatus(payload)),
    dispatchUpdateUserLinks: payload => dispatch(updateUserLinks(payload)),
    dispatchUpdateUserSkills: payload => dispatch(updateUserSkills(payload)),
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
