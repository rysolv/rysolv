import React, { useEffect } from 'react';
import T from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

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
  dispatchChangeInput,
  dispatchChangeStep,
  dispatchInputError,
  dispatchResetForm,
  dispatchSendForm,
  error,
  form,
  formErrors,
  loading,
  step,
  success,
}) => {
  useEffect(() => () => dispatchChangeStep({ step: 1 }), []);

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
        dispatchChangeInput={dispatchChangeInput}
        dispatchChangeStep={dispatchChangeStep}
        dispatchResetForm={dispatchResetForm}
        error={error}
        form={form}
        formErrors={formErrors}
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
  dispatchChangeInput: T.func.isRequired,
  dispatchChangeStep: T.func.isRequired,
  dispatchInputError: T.func.isRequired,
  dispatchResetForm: T.func.isRequired,
  dispatchSendForm: T.func.isRequired,
  error: T.bool.isRequired,
  form: T.object.isRequired,
  formErrors: T.object.isRequired,
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
