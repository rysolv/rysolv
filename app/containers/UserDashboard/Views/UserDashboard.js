import React, { Fragment, useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';

import AsyncRender from 'components/AsyncRender';
import { ModalDialog } from 'components/base_ui';
import UpdateLinksModal from 'components/UpdateLinksModal';
import UpdateSkillsModal from 'components/UpdateSkillsModal';
import UserDashboardView from 'components/UserDashboard';
import makeSelectViewSize from 'containers/ViewSize/selectors';

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
  updateUserLinks,
  updateUserSkills,
} from '../actions';
import { validateFields, validateOneField } from '../helpers';
import {
  makeSelectUserDashboard,
  makeSelectUserDashboardLoading,
  makeSelectUserDashboardQuestions,
} from '../selectors';

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
  dispatchUpdateUserLinks,
  dispatchUpdateUserSkills,
  error,
  fetchQuestionsLoading,
  fetchUserDashboardLoading,
  form,
  formErrors,
  handleNav,
  isModalOpen,
  modal,
  questions,
  skills,
  updateLinksLoading,
  updateSkillsLoading,
  user,
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
        handleUpdateUserLinks,
        handleValidateInput,
        skills,
        updateLinksLoading,
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
        updateSkillsLoading,
        user,
        ...skillsQuestion,
      },
    },
  };

  return (
    <Fragment>
      <AsyncRender
        asyncData={user}
        component={UserDashboardView}
        error={error}
        isRequiredData
        loading={fetchQuestionsLoading || fetchUserDashboardLoading}
        propsToPassDown={{
          deviceView,
          dispatchOpenModal,
          dispatchSetHiringStatus,
          handleNav,
          user,
        }}
      />
      {isModalOpen && <ModalDialog {...modalPropsDictionary[modal]} />}
    </Fragment>
  );
};

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
  dispatchUpdateUserLinks: T.func.isRequired,
  dispatchUpdateUserSkills: T.func.isRequired,
  error: T.oneOfType([T.bool, T.object]),
  fetchQuestionsLoading: T.bool.isRequired,
  fetchUserDashboardLoading: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  isModalOpen: T.bool.isRequired,
  modal: T.string.isRequired,
  questions: T.array.isRequired,
  skills: T.array.isRequired,
  updateLinksLoading: T.bool.isRequired,
  updateSkillsLoading: T.bool.isRequired,
  user: T.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : User Dashboard
   */
  alerts: makeSelectUserDashboard('alerts'),
  error: makeSelectUserDashboard('error'),
  fetchQuestionsLoading: makeSelectUserDashboardLoading('fetchQuestions'),
  fetchUserDashboardLoading: makeSelectUserDashboardLoading(
    'fetchUserDashboard',
  ),
  form: makeSelectUserDashboard('form'),
  formErrors: makeSelectUserDashboard('formErrors'),
  isModalOpen: makeSelectUserDashboard('isModalOpen'),
  modal: makeSelectUserDashboard('modal'),
  questions: makeSelectUserDashboardQuestions(),
  skills: makeSelectUserDashboard('skills'),
  updateLinksLoading: makeSelectUserDashboardLoading('updateUserLinks'),
  updateSkillsLoading: makeSelectUserDashboardLoading('updateUserSkills'),
  user: makeSelectUserDashboard('user'),
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

export default compose(withConnect)(UserDashboard);
