import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import { CreateCompany } from 'components/CompanySignUp';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeView,
  clearAlerts,
  fetchContract,
  fetchQuestions,
  inputError,
  resetState,
  submitCompanyResponse,
} from './actions';
import { validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanySignUp,
  makeSelectCompanySignUpLoading,
  makeSelectCompanySignUpQuestions,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanySignUp = ({
  activeUser,
  alerts,
  contract,
  dispatchChangeInput,
  dispatchChangeView,
  dispatchClearAlerts,
  dispatchFetchContract,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetState,
  dispatchSubmitCompanyResponse,
  error,
  fetchContractLoading,
  fetchQuestionsLoading,
  formErrors,
  forms,
  handleNav,
  questions,
  view,
}) => {
  const { company: companyForm } = forms;
  const {
    company: { companyId, isContractAccepted, isQuestionnaireComplete } = {},
  } = activeUser;
  const [viewToRender, setViewToRender] = useState(view);

  useEffect(() => {
    dispatchFetchContract();
    dispatchFetchQuestions({ category: 'company' });
    return dispatchResetState;
  }, []);

  useEffect(() => {
    if (!isContractAccepted && !isQuestionnaireComplete) {
      setViewToRender(0);
    } else if (!isContractAccepted && isQuestionnaireComplete) {
      setViewToRender(1);
    } else {
      handleNav('/company/dashboard');
    }
  }, [isContractAccepted, isQuestionnaireComplete]);

  useEffect(() => setViewToRender(view), [view]);

  const handleCancel = () => {
    dispatchResetState();
    handleNav('/signup');
  };

  const handleSubmit = () => {
    dispatchSubmitCompanyResponse({
      companyId,
      form: { ...companyForm, plan: 'startup' },
    });
  };

  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'company',
    });
  };

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={questions}
        component={CreateCompany}
        error={error}
        isRequiredData
        loading={fetchQuestionsLoading || fetchContractLoading}
        propsToPassDown={{
          alerts,
          contract,
          dispatchChangeInput,
          dispatchChangeView,
          dispatchClearAlerts,
          formErrors,
          forms,
          handleCancel,
          handleSubmit,
          handleValidateInput,
          questions,
          view: viewToRender,
        }}
      />
    </ViewContainer>
  );
};

CompanySignUp.propTypes = {
  activeUser: T.object.isRequired,
  alerts: T.object.isRequired,
  contract: T.object.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchFetchContract: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSubmitCompanyResponse: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  fetchContractLoading: T.bool.isRequired,
  fetchQuestionsLoading: T.bool.isRequired,
  formErrors: T.object.isRequired,
  forms: T.object.isRequired,
  handleNav: T.func.isRequired,
  questions: T.array.isRequired,
  view: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Auth
   */
  activeUser: makeSelectAuth('activeUser'),
  /*
   * Reducer : CompanySignUp
   */
  alerts: makeSelectCompanySignUp('alerts'),
  contract: makeSelectCompanySignUp('contract'),
  error: makeSelectCompanySignUp('error'),
  fetchContractLoading: makeSelectCompanySignUpLoading('fetchContract'),
  fetchQuestionsLoading: makeSelectCompanySignUpLoading('fetchQuestions'),
  formErrors: makeSelectCompanySignUp('formErrors'),
  forms: makeSelectCompanySignUp('forms'),
  questions: makeSelectCompanySignUpQuestions(),
  view: makeSelectCompanySignUp('view'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanySignUp
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchChangeView: payload => dispatch(changeView(payload)),
  dispatchClearAlerts: () => dispatch(clearAlerts()),
  dispatchFetchContract: () => dispatch(fetchContract()),
  dispatchFetchQuestions: payload => dispatch(fetchQuestions(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchResetState: () => dispatch(resetState()),
  dispatchSubmitCompanyResponse: payload =>
    dispatch(submitCompanyResponse(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companySignUp', reducer });
const withSaga = injectSaga({ key: 'companySignUp', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanySignUp),
);
