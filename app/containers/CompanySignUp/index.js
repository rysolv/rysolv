import React, { useEffect, useState } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import CompanySignUpView from 'components/CompanySignUp';
import { makeSelectAuth } from 'containers/Auth/selectors';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeView,
  clearAlerts,
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
  makeSelectCompanySignUpQuestions,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanySignUp = ({
  activeUser,
  alerts,
  dispatchChangeInput,
  dispatchChangeView,
  dispatchClearAlerts,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetState,
  dispatchSubmitCompanyResponse,
  error,
  formErrors,
  forms,
  handleNav,
  loading,
  questions,
  view,
}) => {
  const { companyInfo: companyInfoForm, contract: contractForm } = forms;
  const { contractAccepted } = contractForm;
  const {
    company: { companyId, isContractAccepted, isQuestionnaireComplete } = {},
  } = activeUser;
  const [viewToRender, setViewToRender] = useState(view);

  useEffect(() => {
    dispatchFetchQuestions({ category: 'company' });
    return dispatchResetState;
  }, []);

  useEffect(() => {
    if (!isContractAccepted && !isQuestionnaireComplete) {
      setViewToRender(0);
    } else if (!isContractAccepted && isQuestionnaireComplete) {
      setViewToRender(1);
    } else {
      handleNav('/dashboard');
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
      form: { ...companyInfoForm, contractAccepted },
    });
  };
  const handleValidateInput = ({ field, values }) => {
    const validationError = validateOneField({ field, values }) || '';
    dispatchInputError({
      errors: {
        [field]: validationError,
      },
      form: 'companyInfo',
    });
  };

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={questions}
        component={CompanySignUpView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          alerts,
          dispatchChangeInput,
          dispatchChangeView,
          dispatchClearAlerts,
          forms,
          formErrors,
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
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchClearAlerts: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSubmitCompanyResponse: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  formErrors: T.object.isRequired,
  forms: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
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
  error: makeSelectCompanySignUp('error'),
  formErrors: makeSelectCompanySignUp('formErrors'),
  forms: makeSelectCompanySignUp('forms'),
  loading: makeSelectCompanySignUp('loading'),
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
