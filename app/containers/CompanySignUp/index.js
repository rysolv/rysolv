import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'connected-react-router';
import { withRouter } from 'react-router-dom';

import AsyncRender from 'components/AsyncRender';
import CompanySignUpView from 'components/CompanySignUp';
import { getQuestion } from 'utils/globalHelpers';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeView,
  fetchQuestions,
  inputError,
  resetState,
  submitCompanyResponse,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectCompanySignUp,
  makeSelectCompanySignUpQuestions,
  makeSelectCompanyResponseArray,
} from './selectors';
import { ViewContainer } from './styledComponents';

const CompanySignUp = ({
  dispatchChangeInput,
  dispatchChangeView,
  dispatchFetchQuestions,
  dispatchInputError,
  dispatchResetState,
  dispatchSubmitCompanyResponse,
  error,
  form,
  handleNav,
  loading,
  match: { path },
  questions,
  responseArray,
  view,
}) => {
  console.log('here');
  useEffect(() => {
    dispatchFetchQuestions({ category: 'company' });
    return dispatchResetState;
  }, []);

  const handleCancel = () => {
    dispatchChangeView({ view: 0 });
    handleNav(`${path}`);
  };
  const handleSubmit = () => {
    dispatchSubmitCompanyResponse({ responseArray });
  };

  const questionProps = questions[step - 1];
  const step = getQuestion();

  return (
    <ViewContainer>
      <AsyncRender
        asyncData={questions}
        component={CompanySignUpView}
        error={error}
        isRequiredData
        loading={loading}
        propsToPassDown={{
          dispatchChangeInput,
          dispatchChangeView,
          dispatchInputError,
          error,
          form,
          handleCancel,
          handleNav,
          handleSubmit,
          loading,
          path,
          step,
          steps: questions.length,
          view,
          ...questionProps,
        }}
      />
    </ViewContainer>
  );
};

CompanySignUp.propTypes = {
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeView: T.func.isRequired,
  dispatchFetchQuestions: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetState: T.func.isRequired,
  dispatchSubmitCompanyResponse: T.func.isRequired,
  error: T.oneOfType([T.object, T.string]),
  form: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
  match: T.object.isRequired,
  questions: T.array.isRequired,
  responseArray: T.array.isRequired,
  view: T.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanySignUp
   */
  error: makeSelectCompanySignUp('error'),
  form: makeSelectCompanySignUp('form'),
  loading: makeSelectCompanySignUp('loading'),
  questions: makeSelectCompanySignUpQuestions(),
  responseArray: makeSelectCompanyResponseArray(),
  view: makeSelectCompanySignUp('view'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanySignUp
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchChangeView: payload => dispatch(changeView(payload)),
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
