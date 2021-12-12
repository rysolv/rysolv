import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { setCookie } from 'utils/globalHelpers';

import makeSelectViewSize from 'containers/ViewSize/selectors';
import CompanyRecruitmentView from 'components/CompanyRecruitment';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import {
  changeInput,
  changeStep,
  inputError,
  resetForm,
  sendForm,
} from './actions';
import { validateFields, validateOneField } from './helpers';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCompanyRecruitment } from './selectors';
import { ViewContainer } from './styledComponents';

const CompanyRecruitment = ({
  deviceView,
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchInputError,
  dispatchResetForm,
  dispatchSendForm,
  error,
  form,
  formErrors,
  handleNav,
  loading,
  step,
  success,
}) => {
  useEffect(() => () => dispatchChangeStep({ step: 1 }), []);

  const handleSelectPlan = ({ plan }) => {
    setCookie('paymentPlan', plan, {
      expires: 'Sun, 19 Jan 2038 00:00:01 GMT;',
    });
    handleNav('/signup?type=company');
  };

  const handleSendContact = () => {
    const { isValidated, validationErrors } = validateFields({ values: form });
    if (isValidated) {
      dispatchSendForm(form);
    } else {
      dispatchInputError({ errors: validationErrors, form });
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

  return (
    <ViewContainer>
      <CompanyRecruitmentView
        deviceView={deviceView}
        dispatchChangeInput={dispatchChangeInput}
        dispatchChangeStep={dispatchChangeStep}
        dispatchResetForm={dispatchResetForm}
        error={error}
        form={form}
        formErrors={formErrors}
        handleSelectPlan={handleSelectPlan}
        handleSendContact={handleSendContact}
        handleValidateInput={handleValidateInput}
        loading={loading}
        step={step}
        success={success}
      />
    </ViewContainer>
  );
};

CompanyRecruitment.propTypes = {
  deviceView: T.string.isRequired,
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  dispatchSendForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
  handleNav: T.func.isRequired,
  loading: T.bool.isRequired,
  step: T.number.isRequired,
  success: T.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  /*
   * Reducer : CompanyRecruitment
   */
  error: makeSelectCompanyRecruitment('error'),
  form: makeSelectCompanyRecruitment('form'),
  formErrors: makeSelectCompanyRecruitment('formErrors'),
  loading: makeSelectCompanyRecruitment('loading'),
  step: makeSelectCompanyRecruitment('step'),
  success: makeSelectCompanyRecruitment('success'),
  /**
   * Reducer: ViewSizes
   */
  deviceView: makeSelectViewSize('deviceView'),
});

const mapDispatchToProps = dispatch => ({
  /*
   * Reducer : CompanyRecruitment
   */
  dispatchChangeInput: payload => dispatch(changeInput(payload)),
  dispatchChangeStep: payload => dispatch(changeStep(payload)),
  dispatchInputError: payload => dispatch(inputError(payload)),
  dispatchResetForm: () => dispatch(resetForm()),
  dispatchSendForm: payload => dispatch(sendForm(payload)),
  /*
   * Reducer : Router
   */
  handleNav: route => dispatch(push(route)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'companyRecruitment', reducer });
const withSaga = injectSaga({ key: 'companyRecruitment', saga });

export default withRouter(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(CompanyRecruitment),
);
